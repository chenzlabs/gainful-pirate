AFRAME.registerComponent('sync-position-yaw', {
  schema: {type: 'selector'},
  tick: function (t, dt) {
    this.el.setAttribute('position', this.data.object3D.position);
    this.el.setAttribute('rotation', 'y', this.data.getAttribute('rotation').y);
  }
});
