  AFRAME.registerComponent('sync-pose', {
    schema: {
      src: {type: 'selector'},
      offset: {type: 'vec3'}
    },
    
    init: function () {
      this.tempPos = new THREE.Vector3();
    },
    
    tick: function (t, dt) {
      this.tempPos.copy(this.data.offset);
      this.tempPos.applyQuaternion(this.data.src.object3D.quaternion);
      this.tempPos.add(this.data.src.object3D.position);
      this.el.setAttribute('position', this.tempPos);
      this.el.setAttribute('rotation', this.data.src.getAttribute('rotation'));
    }
  });