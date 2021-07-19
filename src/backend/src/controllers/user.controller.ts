import {inject} from '@loopback/core';
import {authenticate, TokenService} from '@loopback/authentication';
import {
  Credentials,
  TokenServiceBindings,
  UserServiceBindings,
  RefreshTokenServiceBindings,
} from '@loopback/authentication-jwt';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {model, property, repository} from '@loopback/repository';
import {CustomUserService} from '../services';
import {UserRepository, UserCredentialsRepository} from '../repositories';
import {
  get,
  getModelSchemaRef,
  post,
  requestBody,
  SchemaObject,
  HttpErrors,
  Response,
  Request,
  del,
  RestBindings, oas, OperationVisibility
} from '@loopback/rest'
import {User} from '../models';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(RefreshTokenServiceBindings.REFRESH_TOKEN_SERVICE)
    public tokenService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: CustomUserService,
    @inject(SecurityBindings.USER, {optional: true})
    private user: UserProfile,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,
    @inject(RestBindings.Http.REQUEST) protected request: Request,
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(UserCredentialsRepository) protected userCredentialRepository: UserCredentialsRepository,
  ) {}

  @get('/users', {
    responses: {
      '200': {
        description: 'Users',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при получении юзеров');
    }
  }

  @oas.visibility(OperationVisibility.UNDOCUMENTED)
  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    try {
      const password = await hash(newUserRequest.password, await genSalt());
      const savedUser = await this.userRepository.create(_.omit(newUserRequest, 'password'));
      await this.userRepository.customUserCredentials(savedUser.id).create({password});
      return savedUser;
    } catch {
      throw new HttpErrors['400']('Возникла ошибка при регистрации');
    }
  }

  @post('/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(@requestBody(CredentialsRequestBody) credentials: Credentials): Promise<{token: string}> {
    try {
      const user = await this.userService.verifyCredentials(credentials);
      const userProfile = this.userService.convertToUserProfile(user);
      const token = await this.jwtService.generateToken(userProfile);
      return {token};
    } catch {
      throw new HttpErrors['400']('Логин и/или пароль неверны');
    }
  }

  @authenticate('jwt')
  @get('/whoAmI')
  async whoAmI(): Promise<User> {
    try {
      return await this.userRepository.findById(this.user[securityId]);
    } catch {
      throw new HttpErrors['401']('Пользователь не авторизован');
    }
  }

  @authenticate('jwt')
  @del('/logout')
  async logout(): Promise<void> {
    try {
      this.response.status(204);
      return;
    } catch {
      throw new HttpErrors['400']('Ошибка логаута');
    }
  }
}
