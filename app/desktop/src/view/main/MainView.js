Ext.define('ImageCropperApp.view.main.MainView', {
  extend: 'Ext.Container',
  xtype: 'mainview',
  controller: 'mainviewcontroller',
  viewModel: {
    type: 'mainviewmodel',
  },
  layout: {
    type: 'hbox',
    align: 'start',
  },
  items: [
    {
      xtype: 'image',
      mode: 'background',
      userCls: 'picture',
      bind: {
        src: '{avatar}',
      },
      width: 200,
      height: 200,
      listeners: {
        tap: 'onProfilePictureTap'
      }
    }, 
    {
      xtype: 'inputfile',
      accept: 'image',
      hidden: true,
      listeners: {
        selected: 'onFileSelected',
      }
    },
    {
      xtype: 'dialog',
      reference: 'cropdialog',
      modal: true,
      title: 'Edit avatar',
      items: [
        {
          xtype: 'image',
          mode: 'image',
          reference: 'image',
          width: 400,
          height: 400,
          bind: {
            src: '{image}',
          },
          listeners: {
            load: 'onImageLoad',
          }
        }
      ],
      listeners: {
        hide: 'onDialogHide',
      },
      buttons: {
        cancel: 'onCancel',
        apply: 'onApply',
      }
    },
  ],
});
