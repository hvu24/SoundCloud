'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(
        models.Artist,
        { foreignKey: 'artistId' }
      );

      Song.belongsTo(
        models.Album,
        { foreignKey: 'albumId' }
      );

      Song.hasMany(
        models.Comment,
        { foreignKey: 'songId', onDelete: 'CASCADE',  hooks: true }
      );

      Song.belongsToMany(
        models.Playlist,
          {
            through: models.SongPlaylist,
            as: 'Playlists',
            foreignKey: 'songId'
           }
      );
    }
  }
  Song.init({
    artistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
