const fs = require('fs')
const path = require('path')

const readModelFilenamesFromPath = (dirPath) => (
  fs
    .readdirSync(dirPath)
    .filter(file =>
      (file.indexOf('.') !== 0) &&
      (file !==  path.basename(module.filename)) &&
      (file.slice(-3) === '.js')
    )
)


module.exports = ({ sequelize, Sequelize, modelsPath }) => {
  const mPath = modelsPath || path.resolve(__dirname, '../models')

  const importSequelizeModel = (filename) => require(path.resolve(mPath, filename))(sequelize, Sequelize.DataTypes)

  const modelFilenames = readModelFilenamesFromPath(mPath)

  const models = modelFilenames.map(filename => importSequelizeModel(filename))

  const db = {}

  models.forEach(model => {
    db[model.name] = model
    if (model.isNewFormat && model.isNewFormat()) {
      db[model.name] = model.init(sequelize, Sequelize)
    }
  })

  Object.values(db)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(db))

  return db
}
