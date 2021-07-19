import users from './dummy-users.json'
import columns from './dummy-columns.json'
import initTask from './dummy-task.json'
import {UserRepository, ColumnsRepository, TasksRepository} from '../repositories'
import { genSalt, hash } from 'bcryptjs'
import { Application } from '../application'
import _ from 'lodash'
import { DataObject } from '@loopback/repository'
import { Tasks } from '../models'

interface TasksByColumn {
  [key: string]: Tasks[]
}

const populateUsers = async (
  user: { name: string, email: string, isAdmin: boolean, password: string},
  userRepository: UserRepository
) => {
  const password = await hash(user.password, await genSalt());
  const newUser = await userRepository.create(_.omit(user, 'password'));
  return userRepository.customUserCredentials(newUser.id).create({password});
}

const populateColumns = async (
    column: { title: string },
    columnsRepository: ColumnsRepository
) => {
  return columnsRepository.create(column);
}

const populateTasks = async (
  task: DataObject<Tasks>,
    tasksRepository: TasksRepository
) => {
  return tasksRepository.create(task)
}

export default async function load(app: Application) {
  const usersPromises = users.map(async user => populateUsers(user, await app.getRepository(UserRepository)))
  const resultUsers = await Promise.all(usersPromises)
  const usersIdList = resultUsers.map(({ userId }) => userId)

  for (const column of columns) {
    await populateColumns(column, await app.getRepository(ColumnsRepository))
  }

  const possibleTags = ['Срочно', 'Дизайн', 'Для верстки', 'Фронтенд', 'Бекэнд', 'Не горит']

  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min) ) + min

  const tasksTotal = 20
  const tasksListToSave = [...Array(tasksTotal).keys()].map(i => {
    const numberOfTags = getRandomNumber(0, 5)
    const tags = new Array(numberOfTags).fill(null)
      .map(() => possibleTags[getRandomNumber(0, 5)]).join('#')
    const taskToSave = JSON.parse(JSON.stringify(initTask))
    taskToSave.title = `${taskToSave.title} ${i + 1}`
    taskToSave.description = `${taskToSave.description} ${i + 1}`
    taskToSave.columnId = i % 4 ? i % 4 : null
    taskToSave.statusId = i % 3 ? i % 3 : null
    taskToSave.userId = i % 8 ? usersIdList[i % 8] : null
    taskToSave.dueDate = i > 16 ? new Date().toString() : null
    taskToSave.tags = tags;
    return taskToSave
  })

  const taskByColumns: TasksByColumn = {};
  tasksListToSave.forEach(task => {
    const { columnId } = task
    if (taskByColumns[columnId]) {
      task.sortOrder = taskByColumns[columnId].length
      taskByColumns[columnId].push(task)
    } else {
      task.sortOrder = 0
      taskByColumns[columnId] = [task]
    }
  });

  for (const task of tasksListToSave) {
    await populateTasks(task, await app.getRepository(TasksRepository))
  }

  console.log('Dummy data is populated')
}
