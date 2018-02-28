AFRAME.registerComponent('compute-elbow', {
  schema: {
    length: {default: 0.3},
    gravity: {type: 'vec3', default: '0 -1 0'},
    shoulder: {type: 'selector'},
    wrist: {type: 'selector'},
    origin: {type: 'selector'}
  },

  init: function () {
    this.tempPos = new THREE.Vector3();
    this.tempPos2 = new THREE.Vector3();
    this.tempPos3 = new THREE.Vector3();
  },

  tick: function (t, dt) {
    // compute halfway between shoulder and wrist
    this.tempPos.copy(this.data.wrist.object3D.position);
    this.tempPos.sub(this.data.shoulder.object3D.position);
    this.tempPos.divideScalar(2);

    // if not long enough (which seems rather likely), stretch it
    var d2 = this.tempPos.lengthSq();
    if (d2 < this.data.length * this.data.length) {
      // ... in the direction of origin to shoulder, plus gravity (?)
      this.tempPos2.copy(this.data.shoulder.object3D.position);
      this.tempPos2.sub(this.data.origin.object3D.position);
      this.tempPos2.add(this.data.gravity);

      // Compute the unit vector that is perpendicular to this.tempPos and coplanar with this.tempPos2 ...
      // Compute the cosine of the angle between the two vectors.
      this.tempPos2.normalize();
      this.tempPos3.copy(this.tempPos);
      this.tempPos3.normalize();
      var costheta = this.tempPos2.dot(this.tempPos3);
      
      // Make a perpendicular vector, although it will not be a unit vector.        
      this.tempPos3.multiplyScalar(costheta);
      this.tempPos2.sub(this.tempPos3);

      // Multiply the perpendicular vector to the right amount.
      var d = Math.sqrt(this.data.length * this.data.length - d2);
      this.tempPos2.multiplyScalar(d / this.tempPos2.length());

      // Apply the perpendicular vector to stretch the result.
      this.tempPos.add(this.tempPos2); 
    }      

    // Add back in the shoulder position to the elbow offset, and apply as elbow position.
    this.tempPos.add(this.data.shoulder.object3D.position);
    this.el.setAttribute('position', this.tempPos);
  }
});