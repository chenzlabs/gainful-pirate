AFRAME.registerComponent('show-parent-to-target', {
  schema: {
    target: {type: 'selector'},
    radius: {default: 0.01}
  },

  init: function () {
    this.from = new THREE.Vector3(0, 1, 0);
    this.tempPos = new THREE.Vector3();
    this.tempQuat = new THREE.Quaternion();      
  },

  update: function (oldData) {
    this.el.setAttribute('geometry', 'radius', this.data.radius);
  },

  tick: function (t, dt) {
    this.tempPos.copy(this.data.target.object3D.position);
    this.tempPos.sub(this.el.parentElement.object3D.position);

    // compute height (length but we're using a cylinder)
    this.el.setAttribute('geometry', 'height', this.tempPos.length());

    // compute halfway between
    this.tempPos.divideScalar(2);
    
    // compensate for parent orientation
    this.tempQuat.copy(this.el.parentElement.object3D.quaternion);
    this.tempQuat.inverse();
    this.tempPos.applyQuaternion(this.tempQuat);

    // set position
    this.el.setAttribute('position', this.tempPos);

    // compute orientation
    this.tempPos.normalize();
    this.tempQuat.setFromUnitVectors(this.from, this.tempPos);
    this.el.object3D.quaternion.copy(this.tempQuat);
  }
});