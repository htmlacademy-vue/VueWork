import {injectable, BindingScope} from '@loopback/core';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {UserService} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare} from 'bcryptjs';
import {User} from '../models';
import {UserRepository} from '../repositories';

export type Credentials = {
  email: string;
  password: string;
};

@injectable({scope: BindingScope.TRANSIENT})
export class CustomUserService implements UserService<User, Credentials> {
  constructor(@repository(UserRepository) public userRepository: UserRepository) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const invalidCredentialsError = 'Invalid email or password.';

    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.userRepository.findCredentials(foundUser.id);
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(credentials.password, credentialsFound.password);

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    return {
      [securityId]: user.id.toString(),
      name: user.name,
      id: user.id,
      email: user.email,
    };
  }
}
