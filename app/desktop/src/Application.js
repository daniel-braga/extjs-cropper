Ext.define('ImageCropperApp.Application', {
  extend: 'Ext.app.Application',
  name: 'ImageCropperApp',
  requires: ['ImageCropperApp.*'],

  launch: function () {
    Ext.Viewport.add([{xtype: 'mainview'}])
  },

  onAppUpdate: function () {
    Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
      function (choice) {
        if (choice === 'yes') {
          window.location.reload()
        }
      }
    )
  }
})
