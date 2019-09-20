Ext.define('ImageCropperApp.view.ux.InputFile', {
  extend: 'Ext.field.Input',
  xtype: 'inputfile',
  config: {
    multiple: false,
    accept: null,
    capture: null,
  },
  inputType: 'file',
  applyAccept: function(value) {
    switch (value) {
      case "video":
      case "audio":
      case "image":
        value = value + "/*";
        break;
    }

    this.setInputAttribute('accept', value);
  },

  applyCapture: function(value) {
    this.setInputAttribute('capture', value);

    return value;
  },

  applyMultiple: function(value) {
    this.setInputAttribute('multiple', value ? '' : null);

    return value;
  },

  initialize: function() {
    let me = this;

    me.callParent();
    me.inputElement.on('change', 'onChange', me);
  },

  getFiles: function() {
    return this.inputElement.dom.files;
  },

  openDialog: function() {
    this.inputElement.dom.click();
  },

  onChange: function() {
    this.fireEvent('selected', this, this.getFiles());
  },
 
  privates: {
      setInputAttribute: function(attribute, newValue) {
          let inputElement = this.inputElement.dom;

          if (!Ext.isEmpty(newValue, true)) {
            inputElement.setAttribute(attribute, newValue);
          } else {
            inputElement.removeAttribute(attribute);
          }
      },
  },
});