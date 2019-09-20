Ext.define('ImageCropperApp.view.main.MainViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewcontroller',

  init: function() {
    let avatar = localStorage.getItem('avatar');
    this.cropper = null;

    if (avatar) {
      this.getViewModel().set('avatar', avatar);
    }
    
  },

  onProfilePictureTap: function() {
    let me = this,
      view = me.getView().down('inputfile');

      view.openDialog();
  },

  onFileSelected: function(input, filelist) {
    let me = this;

    if (filelist.length > 0) {
      me.showCropDialog(filelist[0]);
      input.setValue('');
    }
  },

  showCropDialog: function (file) {
    let me = this,
      reader,
      dialog = this.lookup('cropdialog');
    
    if (URL) {
      me.getViewModel().set('image', URL.createObjectURL(file));
    } else if (FileReader) {
      reader = new FileReader();
      reader.onload = function(e) {
        me.getViewModel().set('image', reader.result);
      }
      reader.readAsDataURL(file);
    } else {
      Ext.Msg.alert('Ops...', 'O seu navegador não tem suporte à leitura de arquivos');
      return;
    }

    dialog.show();
  },

  onCancel: function() {
    let me = this,
      dialog = this.lookup('cropdialog');

      dialog.hide();
  },

  onApply: function() {
    let me = this,
      dialog = this.lookup('cropdialog'),
      canvas, oldAvatar;

    if (me.cropper) {
      canvas = me.cropper.getCroppedCanvas({
        width: 200,
        height: 200,
      });

      oldAvatar = me.getViewModel().get('avatar');
      me.getViewModel().set('avatar', canvas.toDataURL());

      canvas.toBlob(function(blob) {
        let formData = new FormData();

        formData.append('avatar', blob, 'avatar.jpg');
        Ext.Ajax.request({
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'POST',
          rawData: formData,
          isXdr: true,
        }).then(function() {
          localStorage.setItem('avatar', canvas.toDataURL());
          dialog.hide();
        }).catch(function(response) {
          const { status } = response;
          me.getViewModel().set('avatar', oldAvatar);
          Ext.Msg.alert('Ops...', `O servidor respondeu com código ${status}`);
        });
      });
    }
  },

  onImageLoad: function(img) {
    let me = this;
    
    me.cropper = new Cropper(img.imageElement.dom, {
      aspectRatio: 1,
      viewMode: 3,
      dragMode: 'move',
    });
  },

  onDialogHide: function() {
    let me = this;

    if (me.cropper) {
      me.cropper.destroy();
      me.cropper = null;
    }
  },
});
