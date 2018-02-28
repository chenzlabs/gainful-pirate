// undesirable hack to fix Oculus Touch pose, 
// from https://github.com/aframevr/aframe/issues/2965#issuecomment-341949659
// which didn't work for me, so I made this version

// FIX ONE: point raycaster in the right direction
AFRAME.components['laser-controls'].Component.prototype.config['oculus-touch-controls'].raycaster.direction.y = 0;

AFRAME.components['oculus-touch-controls'].originalOnModelLoaded = AFRAME.components['oculus-touch-controls'].Component.prototype.onModelLoaded;
AFRAME.components['oculus-touch-controls'].Component.prototype.onModelLoaded = function (evt) {
  AFRAME.components['oculus-touch-controls'].originalOnModelLoaded.call(this, evt);        
  // FIX TWO: align model with raycaster (and reality)
  this.el.object3D.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      if (child.name.indexOf("body_oculus-touch-controller-") == 0) {
        child.parent.rotateX(Math.PI / 4);
        child.parent.translateY(0.06);
      }
    }
  });
};
