/**
 * RUBYANIMATE
 * @package         RubyAnimate
 * @author          HaiBach
 * @link            http://haibach.net
 * @version         1.5
 */

(function() {
'use strict';


/**
 * RUBY ANIMATE KEYFRAMES
 */
window.__rubyAnimateKeyframes__ = {

    /**
     * CORE - SPCECIAL
     */
    fadeOut : [
        { pos: 100, opacity: 0 }
    ],

    fadeIn : [
        { pos: 0, opacity: 0 }
    ],

    fadeSlowOut : [
        { pos: [20, 100], opacity: 0 }
    ],

    fadeSlowIn : [
        { pos: [0, 80], opacity: 0 }
    ],

    bounceOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 25, z: -50 },
        { pos: 50, z: 100 },
        { pos: 100, z: -3000, opacity: 0 }
    ],

    bounceIn : [
        { pos: 0, perspectiveTF: 1200, z: -3000, opacity: 0 },
        { pos: 50, z: 100, opacity: 1 },
        { pos: 75, z: -50 }
    ],

    roSlit : [
        { pos: 0, perspectiveTF: 800, z: -3000, rotateY: 90, opacity: 0 },
        { pos: 50, z: -250, rotateY: 89, opacity: 1 }
    ],

    newspaperOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 100, z: -3000, rotate: -1080, opacity: 0, easing: 'easeOutQuart' }
    ],

    newspaperIn : [
        { pos: 0, perspectiveTF: 1200, z: -3000, rotate: 1080, opacity: 0 },
        { pos: 100, z: 0, rotate: 0, opacity: 1, easing: 'easeOutQuart' }
    ],

    holeOut : [
        { pos: 100, perspectiveTF: 800, z: -3000, rotateY: 180, opacity: 0 }
    ],

    holeIn : [
        { pos: 0, perspectiveTF: 800, z: -3000, rotateY: -180, opacity: 0 }
    ],










    flipXOut : [
        { pos: 0, perspectiveTF: 400 },
        { pos: 100, rotateX: 90, opacity: 0 }
    ],

    flipYOut : [
        { pos: 0, perspectiveTF: 400 },
        { pos: 100, rotateY: 90, opacity: 0 }
    ],

    flipXIn : [
        { pos: 0, perspectiveTF: 400, rotateX: 90, opacity: 0 },
        { pos: 40, rotateX: -10, opacity: 1 },
        { pos: 70, rotateX: 10 },
        { pos: 100, rotateX: 0 }
    ],

    flipYIn : [
        { pos: 0, perspectiveTF: 400, rotateY: 90, opacity: 0 },
        { pos: 40, rotateY: -10, opacity: 1 },
        { pos: 70, rotateY: 10 },
        { pos: 100, rotateY: 0 }
    ],

    lightSpeedOut : [
        { pos: 0, originTF: '100% 100%' },
        { pos: 40, x: '100%', skew: -30 },
        { pos: 70, skew: 15, opacity: 0.5 },
        { pos: 100, skew: -30, opacity: 0 }
    ],

    lightSpeedIn : [
        { pos: 0, originTF: '0 100%', x: '100%', skew: -30, opacity: 0 },
        { pos: 40, x: 0, skew: 30, opacity: 1 },
        { pos: 70, skew: -15 }
    ],










    hingeLeft : [
        { pos: 0, originTF: '0 0' },
        { pos: [20, 60], rotate: 80, easing: 'easeInOutQuad' },
        { pos: 40, rotate: 60 },
        { pos: 80, rotate: 60 },
        { pos: 100, y: 700, rotate: 20, opacity: 0, isTFOrderByEnd: true }
    ],

    hingeRight : [
        { pos: 0, originTF: '100% 0' },
        { pos: [20, 60], rotate: -80, easing: 'easeInOutQuad' },
        { pos: 40, rotate: -60 },
        { pos: 80, rotate: -60 },
        { pos: 100, y: 700, rotate: -20, opacity: 0, isTFOrderByEnd: true }
    ],

    rollLeftOut : [
        { pos: 100, x: '-100%', rotate: -120, opacity: 0 }
    ],

    rollRightOut : [
        { pos: 100, x: '100%', rotate: 120, opacity: 0 }
    ],

    rollLeftIn : [
        { pos: 0, x: '-100%', rotate: -120, opacity: 0 }
    ],

    rollRightIn : [
        { pos: 0, x: '100%', rotate: 120, opacity: 0 }
    ],

    magic : [
        { pos: 0, originTF: '100% 200%' },
        { pos: 100, scale: 0, rotate: 270, opacity: 0 }
    ],

    swap : [
        { pos: 0, originTF: '0 100%', scale: 0, x: '-30%', opacity: 0 }
    ],

    twistUpIn : [
        { pos: 0, originTF: '100% 0', scale: 0, rotate: 360, y: '100%', opacity: 0 },
        { pos: 30 },
        { pos: 100, originTF: '0 0', scale: 1, rotate: 0, y: 0, opacity: 1 }
    ],

    twistDownIn : [
        { pos: 0, originTF: '0 100%', scale: 0, rotate: 360, y: '-100%', opacity: 0 },
        { pos: 30 },
        { pos: 100, originTF: '100% 100%', scale: 1, rotate: 0, y: 0, opacity: 1 }
    ],











    foolishOut : [
        { pos: 0, rotate: 360 },
        { pos: 20, originTF: '0 0', scale: 0.5, rotate: 0 },
        { pos: 40, originTF: '100% 0' },
        { pos: 60, originTF: '0 0' },
        { pos: 80, originTF: '0 100%' },
        { pos: 100, originTF: '50% 50%', scale: 0, opacity: 0 }
    ],

    foolishIn : [
        { pos: 0, scale: 0, rotate: 360, opacity: 0 },
        { pos: 20, originTF: '0 100%', scale: 0.5, rotate: 0, opacity: 1 },
        { pos: 40, originTF: '100% 100%' },
        { pos: 60, originTF: '0 0' },
        { pos: 80, originTF: '50% 50%', scale: 1 }
    ],

    bombLeftOut : [
        { pos: 0, originTF: '-100% 50%' },
        { pos: 50, rotate: -160 },
        { pos: 100, opacity: 0 }
    ],

    bombRightOut : [
        { pos: 0, originTF: '200% 50%' },
        { pos: 50, rotate: 160 },
        { pos: 100, opacity: 0 }
    ],










    /**
     * PULL - GLUE - PERSPECTIVE
     */
    pullOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 100, z: -2000, opacity: 0 }
    ],

    pullIn : [
        { pos: 0, perspectiveTF: 1200, z: -2000, opacity: 0 }
    ],

    pushOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 100, z: 500, opacity: 0 }
    ],

    pushIn : [
        { pos: 0, perspectiveTF: 1200, z: 500, opacity: 0 }
    ],

    swashOut : [
        { pos: 80, scale: 0.9 },
        { pos: 100, scale: 0, opacity: 0 }
    ],

    swashIn : [
        { pos: 0, scale: 0, opacity: 0 },
        { pos: 90, scale: 0.9, opacity: 1 }
    ],

    pullBounceOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 20, z: 150 },
        { pos: 100, z: -2000, opacity: 0, easing: 'easeOutBounce' }
    ],

    pullBounceIn : [
        { pos: 0, perspectiveTF: 1200, z: -2000, opacity: 0 },
        { pos: 80, z: 0, opacity: 1, easing: 'easeOutBounce' }
    ],

    pushBounceOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 20, z: 0 },
        { pos: 100, z: 500, opacity: 0, easing: 'easeOutBounce' }
    ],

    pushBounceIn : [
        { pos: 0, perspectiveTF: 1200, z: 500, opacity: 0 },
        { pos: 80, z: 0, opacity: 1, easing: 'easeOutBounce' }
    ],

    pullSoftOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 100, z: -100, opacity: 0 }
    ],

    pullSoftIn : [
        { pos: 0, perspectiveTF: 1200, z: -100, opacity: 0 }
    ],

    pushSoftOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 100, z: 100, opacity: 0 }
    ],

    pushSoftIn : [
        { pos: 0, perspectiveTF: 1200, z: 100, opacity: 0 }
    ],










    glueLeftOut : [
        { pos: 0, originTF: '0 50%', perspectiveTF: 800 },
        { pos: 40, originTF: '0 50%', rotateY: 15, opacity: 0.8 },
        { pos: 100, originTF: '20% 50%', z: -1000, rotateY: 0, opacity: 0, isTFOrderByEnd: true }
    ],

    glueRightOut : [
        { pos: 0, originTF: '100% 50%', perspectiveTF: 800 },
        { pos: 40, originTF: '100% 50%', rotateY: -15, opacity: 0.8 },
        { pos: 100, originTF: '80% 50%', z: -1000, rotateY: 0, opacity: 0, isTFOrderByEnd: true }
    ],

    glueUpOut : [
        { pos: 0, originTF: '50% 0', perspectiveTF: 800 },
        { pos: 40, originTF: '50% 0', rotateX: -15, opacity: 0.8 },
        { pos: 100, originTF: '50% 20%', z: -1000, rotateX: 0, opacity: 0, isTFOrderByEnd: true }
    ],

    glueDownOut : [
        { pos: 0, originTF: '50% 100%', perspectiveTF: 800 },
        { pos: 40, originTF: '50% 100%', rotateX: 15, opacity: 0.8 },
        { pos: 100, originTF: '50% 80%', z: -1000, rotateX: 0, opacity: 0, isTFOrderByEnd: true }
    ],

    glueLeftIn : [
        { pos: 0, originTF: '20% 50%', perspectiveTF: 800, z: -1000, opacity: 0 },
        { pos: 40, originTF: '0 50%', rotateY: 15, z: 0, opacity: 0.8 }
    ],

    glueRightIn : [
        { pos: 0, originTF: '80% 50%', perspectiveTF: 800, z: -1000, opacity: 0 },
        { pos: 40, originTF: '100% 50%', rotateY: -15, z: 0, opacity: 0.8 }
    ],

    glueUpIn : [
        { pos: 0, originTF: '50% 20%', perspectiveTF: 800, z: -1000, opacity: 0 },
        { pos: 40, originTF: '50% 0', rotateX: -15, z: 0, opacity: 0.8 }
    ],

    glueDownIn : [
        { pos: 0, originTF: '50% 80%', perspectiveTF: 800, z: -1000, opacity: 0 },
        { pos: 40, originTF: '50% 100%', rotateX: 15, z: 0, opacity: 0.8 }
    ],










    perspectiveLeftOut : [
        { pos: 0, originTF: '0 50%', perspectiveTF: 800 },
        { pos: 100, rotateY: -180, opacity: 0 }
    ],

    perspectiveRightOut : [
        { pos: 0, originTF: '100% 50%', perspectiveTF: 800 },
        { pos: 100, rotateY: 180, opacity: 0 }
    ],

    perspectiveUpOut : [
        { pos: 0, originTF: '50% 0', perspectiveTF: 800 },
        { pos: 100, rotateX: 180, opacity: 0 }
    ],

    perspectiveDownOut : [
        { pos: 0, originTF: '50% 100%', perspectiveTF: 800 },
        { pos: 100, rotateX: -180, opacity: 0 }
    ],

    perspectiveLeftIn : [
        { pos: 0, originTF: '0 50%', perspectiveTF: 800, rotateY: -180, opacity: 0 }
    ],

    perspectiveRightIn : [
        { pos: 0, originTF: '100% 50%', perspectiveTF: 800, rotateY: 180, opacity: 0 }
    ],

    perspectiveUpIn : [
        { pos: 0, originTF: '50% 0', perspectiveTF: 800, rotateX: 180, opacity: 0 }
    ],

    perspectiveDownIn : [
        { pos: 0, originTF: '50% 100%', perspectiveTF: 800, rotateX: -180, opacity: 0 }
    ],










    /**
     * MOVE - FAN - SCALE
     */
    moveLeftBehind : [
        { pos: 0, perspectiveTF: 800, 'z-index': 9999 },
        { pos: 50, x: '-120%', rotateY: 35, rotateX: 10 },
        { pos: 51, 'z-index': 0 },
        { pos: 100, x: 0, z: -100, rotateY: 0, rotateX: 0, opacity: 0 }
    ],

    moveRightBehind : [
        { pos: 0, perspectiveTF: 800, 'z-index': 9999 },
        { pos: 50, x: '120%', rotateY: -35, rotateX: 10 },
        { pos: 51, 'z-index': 0 },
        { pos: 100, x: 0, z: -100, rotateY: 0, rotateX: 0, opacity: 0 }
    ],

    moveLeftFront : [
        { pos: 0, perspectiveTF: 800, opacity: 0, 'z-index': -1 },
        { pos: 50, x: '-120%', z: -100, rotateY: 35, rotateX: 10, opacity: 1 },
        { pos: 51, 'z-index': 9999 }
    ],

    moveRightFront : [
        { pos: 0, perspectiveTF: 800, opacity: 0, 'z-index': -1 },
        { pos: 50, x: '120%', z: -100, rotateY: -35, rotateX: 10, opacity: 1 },
        { pos: 51, 'z-index': 9999 }
    ],

    moveShortLeftBehind : [
        { pos: 0, perspectiveTF: 800 },
        { pos: 40, x: '-40%', scale: 0.8, rotateY: 20, 'z-index': 9999 },
        { pos: 100, x: 0, z: -400, rotateY: 0, opacity: 0 }
    ],

    moveShortRightBehind : [
        { pos: 0, perspectiveTF: 800 },
        { pos: 40, x: '40%', scale: 0.8, rotateY: -20, 'z-index': 9999 },
        { pos: 100, x: 0, z: -400, rotateY: 0, opacity: 0 }
    ],

    moveShortLeftFront : [
        { pos: 0, perspectiveTF: 800, z: -400, opacity: 0 },
        { pos: 40, x: '-40%', z: 0, scale: 0.8, rotateY: 20, opacity: 1 },
        { pos: 41, 'z-index': 9999 }
    ],

    moveShortRightFront : [
        { pos: 0, perspectiveTF: 800, z: -400, opacity: 0 },
        { pos: 40, x: '40%', z: 0, scale: 0.8, rotateY: -20, opacity: 1 },
        { pos: 41, 'z-index': 9999 }
    ],










    fanBehindUp : [
        { pos: 0, originTF: '-50% -50%', 'z-index': 9 },
        { pos: 50, rotate: -20, opacity: 0.8, 'z-index': 9 },
        { pos: 100, rotate: 0, opacity: 0 }
    ],

    fanBehindDown : [
        { pos: 0, originTF: '-50% -50%', 'z-index': 9 },
        { pos: 50, rotate: 30, opacity: 0.8, 'z-index': 9 },
        { pos: 100, rotate: 0, opacity: 0 }
    ],

    fanFrontUp : [
        { pos: 0, originTF: '-50% -50%' },
        { pos: 50, rotate: -20, opacity: 0.8 },
        { pos: 51, 'z-index': 9 }
    ],

    fanFrontDown : [
        { pos: 0, originTF: '-50% -50%' },
        { pos: 50, rotate: 30, opacity: 0.8 },
        { pos: 51, 'z-index': 9 }
    ],










    soEdgeLeftOut : [
        { pos: 0, originTF: '0 50%' },
        { pos: 100, scale: 0 }
    ],

    soEdgeRightOut : [
        { pos: 0, originTF: '100% 50%' },
        { pos: 100, scale: 0 }
    ],

    soEdgeUpOut : [
        { pos: 0, originTF: '50% 0' },
        { pos: 100, scale: 0 }
    ],

    soEdgeDownOut : [
        { pos: 0, originTF: '50% 100%' },
        { pos: 100, scale: 0 }
    ],

    soEdgeLeftIn : [
        { pos: 0, originTF: '0 50%', scale: 0 }
    ],

    soEdgeRightIn : [
        { pos: 0, originTF: '100% 50%', scale: 0 }
    ],

    soEdgeUpIn : [
        { pos: 0, originTF: '50% 0', scale: 0 }
    ],

    soEdgeDownIn : [
        { pos: 0, originTF: '50% 100%', scale: 0 }
    ],










    soEdgeOneLeftOut : [
        { pos: 0, originTF: '0 50%' },
        { pos: 100, scaleX: 0 }
    ],

    soEdgeOneRightOut : [
        { pos: 0, originTF: '100% 50%' },
        { pos: 100, scaleX: 0 }
    ],

    soEdgeOneUpOut : [
        { pos: 0, originTF: '50% 0' },
        { pos: 100, scaleY: 0 }
    ],

    soEdgeOneDownOut : [
        { pos: 0, originTF: '50% 100%' },
        { pos: 100, scaleY: 0 }
    ],

    soEdgeOneLeftIn : [
        { pos: 0, originTF: '0 50%', scaleX: 0 }
    ],

    soEdgeOneRightIn : [
        { pos: 0, originTF: '100% 50%', scaleX: 0 }
    ],

    soEdgeOneUpIn : [
        { pos: 0, originTF: '50% 0', scaleY: 0 }
    ],

    soEdgeOneDownIn : [
        { pos: 0, originTF: '50% 100%', scaleY: 0 }
    ],










    /**
     * SLIDE
     */
    slideLeftOut : [
        { pos: 100, x: -2000, opacity: 0 }
    ],

    slideRightOut : [
        { pos: 100, x: 2000, opacity: 0 }
    ],

    slideUpOut : [
        { pos: 100, y: -2000, opacity: 0 }
    ],

    slideDownOut : [
        { pos: 100, y: 2000, opacity: 0 }
    ],

    slideLeftIn : [
        { pos: 0, x: -2000, opacity: 0 }
    ],

    slideRightIn : [
        { pos: 0, x: 2000, opacity: 0 }
    ],

    slideUpIn : [
        { pos: 0, y: -2000, opacity: 0 }
    ],

    slideDownIn : [
        { pos: 0, y: 2000, opacity: 0 }
    ],










    slideOneLeftOut : [
        { pos: 100, x: '-100%' }
    ],

    slideOneRightOut : [
        { pos: 100, x: '100%' }
    ],

    slideOneUpOut : [
        { pos: 100, y: '-100%' }
    ],

    slideOneDownOut : [
        { pos: 100, y: '100%' }
    ],

    slideOneLeftIn : [
        { pos: 0, x: '-100%' }
    ],

    slideOneRightIn : [
        { pos: 0, x: '100%' }
    ],

    slideOneUpIn : [
        { pos: 0, y: '-100%' }
    ],

    slideOneDownIn : [
        { pos: 0, y: '100%' }
    ],










    slideShortLeftOut : [
        { pos: 100, x: '-20%', opacity: 0 }
    ],

    slideShortRightOut : [
        { pos: 100, x: '20%', opacity: 0 }
    ],

    slideShortUpOut : [
        { pos: 100, y: '-20%', opacity: 0 }
    ],

    slideShortDownOut : [
        { pos: 100, y: '20%', opacity: 0 }
    ],

    slideShortLeftIn : [
        { pos: 0, x: '-20%', opacity: 0 }
    ],

    slideShortRightIn : [
        { pos: 0, x: '20%', opacity: 0 }
    ],

    slideShortUpIn : [
        { pos: 0, y: '20%', opacity: 0 }
    ],

    slideShortDownIn : [
        { pos: 0, y: '-20%', opacity: 0 }
    ],










    slideFadeLeftOut : [
        { pos: 100, x: -2000, opacity: 0 }
    ],

    slideFadeRightOut : [
        { pos: 100, x: 2000, opacity: 0 }
    ],

    slideFadeUpOut : [
        { pos: 100, y: -2000, opacity: 0 }
    ],

    slideFadeDownOut : [
        { pos: 100, y: 2000, opacity: 0 }
    ],

    slideFadeLeftIn : [
        { pos: 0, x: -2000, opacity: 0 }
    ],

    slideFadeRightIn : [
        { pos: 0, x: 2000, opacity: 0 }
    ],

    slideFadeUpIn : [
        { pos: 0, y: 2000, opacity: 0 }
    ],

    slideFadeDownIn : [
        { pos: 0, y: -2000, opacity: 0 }
    ],










    slideBounceDownOut : [
        { pos: 20, y: -20 },
        { pos: 100, y: 2000, opacity: 0 }
    ],

    slideBounceLeftOut : [
        { pos: 20, x: 20 },
        { pos: 100, x: -2000, opacity: 0 }
    ],

    slideBounceRightOut : [
        { pos: 20, x: -20 },
        { pos: 100, x: 2000, opacity: 0 }
    ],

    slideBounceUpOut : [
        { pos: 20, y: 20 },
        { pos: 100, y: -2000, opacity: 0 }
    ],

    slideBounceDownIn : [
        { pos: 0, y: -2000, opacity: 0 },
        { pos: 60, y: 30, opacity: 1 },
        { pos: 80, y: -10 }
    ],

    slideBounceLeftIn : [
        { pos: 0, x: -2000, opacity: 0 },
        { pos: 60, x: 30, opacity: 1 },
        { pos: 80, x: -10 }
    ],

    slideBounceUpIn : [
        { pos: 0, y: 2000, opacity: 0 },
        { pos: 60, y: -30, opacity: 1 },
        { pos: 80, y: 10 }
    ],










    slideTinLeftOut : [
        { pos: [0, 20, 40, 50], perspectiveTF: 1200, z: 0 },
        { pos: [10, 30], z: 100 },
        { pos: 100, z: 0, x: -1000, opacity: 0 }
    ],

    slideTinRightOut : [
        { pos: [0, 20, 40, 50], perspectiveTF: 1200, z: 0 },
        { pos: [10, 30], z: 100 },
        { pos: 100, z: 0, x: 1000, opacity: 0 }
    ],

    slideTinUpOut : [
        { pos: [0, 20, 40, 50], perspectiveTF: 1200, z: 0 },
        { pos: [10, 30], z: 100 },
        { pos: 100, z: 0, y: -1000, opacity: 0 }
    ],

    slideTinDownOut : [
        { pos: [0, 20, 40, 50], perspectiveTF: 1200, z: 0 },
        { pos: [10, 30], z: 100 },
        { pos: 100, z: 0, y: 1000, opacity: 0 }
    ],

    slideTinLeftIn : [
        { pos: 0, perspectiveTF: 1200, x: -1000, opacity: 0 },
        { pos: [50, 70, 90], z: 100, x: 0, opacity: 1 },
        { pos: [60, 80, 100], z: 0 }
    ],

    slideTinRightIn : [
        { pos: 0, perspectiveTF: 1200, x: 1000, opacity: 0 },
        { pos: [50, 70, 90], z: 100, x: 0, opacity: 1 },
        { pos: [60, 80, 100], z: 0 }
    ],

    slideTinUpIn : [
        { pos: 0, perspectiveTF: 1200, y: -1000, opacity: 0 },
        { pos: [50, 70, 90], z: 100, y: 0, opacity: 1 },
        { pos: [60, 80, 100], z: 0 }
    ],

    slideTinDownIn : [
        { pos: 0, perspectiveTF: 1200, y: 1000, opacity: 0 },
        { pos: [50, 70, 90], z: 100, y: 0, opacity: 1 },
        { pos: [60, 80, 100], z: 0 }
    ],










    slideShakeLeftOut : [
        { pos: 25, x: '-50%', rotate: -7 },
        { pos: 50, x: '-100%', rotate: 7, opacity: 0.7 },
        { pos: 100, x: '-200%', rotate: 0, opacity: 0 }
    ],

    slideShakeRightOut : [
        { pos: 25, x: '50%', rotate: 7 },
        { pos: 50, x: '100%', rotate: -7, opacity: 0.7 },
        { pos: 100, x: '200%', rotate: 0, opacity: 0 }
    ],

    slideShakeUpOut : [
        { pos: 25, y: '-50%', rotate: -7 },
        { pos: 50, y: '-100%', rotate: 7, opacity: 0.7 },
        { pos: 100, y: '-200%', rotate: 0, opacity: 0 }
    ],

    slideShakeDownOut : [
        { pos: 25, y: '50%', rotate: 7 },
        { pos: 50, y: '100%', rotate: -7, opacity: 0.7 },
        { pos: 100, y: '200%', rotate: 0, opacity: 0 }
    ],

    slideShakeLeftIn : [
        { pos: 0, x: '-200%', opacity: 0 },
        { pos: 50, x: '-100%', rotate: 7, opacity: 0.7 },
        { pos: 75, x: '-50%', rotate: -7 }
    ],

    slideShakeRightIn : [
        { pos: 0, x: '200%', opacity: 0 },
        { pos: 50, x: '100%', rotate: -7, opacity: 0.7 },
        { pos: 75, x: '50%', rotate: 7 }
    ],

    slideShakeUpIn : [
        { pos: 0, y: '-200%', opacity: 0 },
        { pos: 50, y: '-100%', rotate: 7, opacity: 0.7 },
        { pos: 75, y: '-50%', rotate: -7 }
    ],

    slideShakeDownIn : [
        { pos: 0, y: '200%', opacity: 0 },
        { pos: 50, y: '100%', rotate: -7, opacity: 0.7 },
        { pos: 75, y: '50%', rotate: 7 }
    ],











    slideScaleLeftOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 30, z: 100 },
        { pos: 100, x: -2000, z: -200, opacity: 0, isTFOrderByEnd: true }
    ],

    slideScaleRightOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 30, z: 100 },
        { pos: 100, x: 2000, z: -200, opacity: 0, isTFOrderByEnd: true }
    ],

    slideScaleUpOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 30, z: 100 },
        { pos: 100, y: -2000, z: -200, opacity: 0, isTFOrderByEnd: true }
    ],

    slideScaleDownOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 30, z: 100 },
        { pos: 100, y: 2000, z: -200, opacity: 0, isTFOrderByEnd: true }
    ],

    slideScaleLeftIn : [
        { pos: 0, perspectiveTF: 1200, x: -2000, z: -400, opacity: 0 },
        { pos: 80, x: 0, z: -200, opacity: 1 }
    ],

    slideScaleRightIn : [
        { pos: 0, perspectiveTF: 1200, x: 2000, z: -400, opacity: 0 },
        { pos: 80, x: 0, z: -200, opacity: 1 }
    ],

    slideScaleUpIn : [
        { pos: 0, perspectiveTF: 1200, y: -2000, z: -400, opacity: 0 },
        { pos: 80, y: 0, z: -200, opacity: 1 }
    ],

    slideScaleDownIn : [
        { pos: 0, perspectiveTF: 1200, y: 2000, z: -400, opacity: 0 },
        { pos: 80, y: 0, z: -200, opacity: 1 }
    ],










    slidePullLeftOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 25, z: -500, opacity: 0.5 },
        { pos: 75, x: '-200%' },
        { pos: 100, opacity: 0 }
    ],

    slidePullRightOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 25, z: -500, opacity: 0.5 },
        { pos: 75, x: '200%' },
        { pos: 100, opacity: 0 }
    ],

    slidePullUpOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 25, z: -500, opacity: 0.5 },
        { pos: 75, y: '-200%' },
        { pos: 100, opacity: 0 }
    ],

    slidePullDownOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 25, z: -500, opacity: 0.5 },
        { pos: 75, y: '200%' },
        { pos: 100, opacity: 0 }
    ],

    slidePullLeftIn : [
        { pos: 0, perspectiveTF: 1200, x: '-200%', z: -500, opacity: 0 },
        { pos: 25, opacity: 0.5 },
        { pos: 75, x: 0 }
    ],

    slidePullRightIn : [
        { pos: 0, perspectiveTF: 1200, x: '200%', z: -500, opacity: 0 },
        { pos: 25, opacity: 0.5 },
        { pos: 75, x: 0 }
    ],

    slidePullUpIn : [
        { pos: 0, perspectiveTF: 1200, y: '-200%', z: -500, opacity: 0 },
        { pos: 25, opacity: 0.5 },
        { pos: 75, y: 0 }
    ],

    slidePullDownIn : [
        { pos: 0, perspectiveTF: 1200, y: '200%', z: -500, opacity: 0 },
        { pos: 25, opacity: 0.5 },
        { pos: 75, y: 0 }
    ],











    /**
     * ROTATE
     */
    rotateOut : [
        { pos: 100, rotate: 200, opacity: 0 }
    ],

    rotateIn : [
        { pos: 0, rotate: -200, opacity: 0 }
    ],











    roLeftOut : [
        { pos: 0, originTF: '50% 50% -200px', perspectiveTF: 800, z: -200 },
        { pos: 100, rotateY: -180, opacity: 0 }
    ],

    roRightOut : [
        { pos: 0, originTF: '50% 50% -200px', perspectiveTF: 800, z: -200 },
        { pos: 100, rotateY: 180, opacity: 0 }
    ],

    roUpOut : [
        { pos: 0, originTF: '50% 50% -150px', perspectiveTF: 800, z: -150 },
        { pos: 100, rotateX: 180, opacity: 0 }
    ],

    roDownOut : [
        { pos: 0, originTF: '50% 50% -150px', perspectiveTF: 800, z: -150 },
        { pos: 100, rotateX: -180, opacity: 0 }
    ],

    roLeftIn : [
        { pos: 0, originTF: '50% 50% -200px', perspectiveTF: 800, z: -200, rotateY: -180, opacity: 0 },
        { pos: 100, rotateY: 0, opacity: 1 }
    ],

    roRightIn : [
        { pos: 0, originTF: '50% 50% -200px', perspectiveTF: 800, z: -200, rotateY: 180, opacity: 0 },
        { pos: 100, rotateY: 0, opacity: 1 }
    ],

    roUpIn : [
        { pos: 0, originTF: '50% 50% -150px', perspectiveTF: 800, z: -150, rotateX: 180, opacity: 0 },
        { pos: 100, rotateX: 0, opacity: 1 }
    ],

    roDownIn : [
        { pos: 0, originTF: '50% 50% -150px', perspectiveTF: 800, z: -150, rotateX: -180, opacity: 0 },
        { pos: 100, rotateX: 0, opacity: 1 }
    ],










    roDownLeftOut : [
        { pos: 0, originTF: '0 100%' },
        { pos: 100, rotate: 90, opacity: 0 }
    ],

    roDownRightOut : [
        { pos: 0, originTF: '100% 100%' },
        { pos: 100, rotate: -90, opacity: 0 }
    ],

    roUpLeftOut : [
        { pos: 0, originTF: '0 100%' },
        { pos: 100, rotate: -90, opacity: 0 }
    ],

    roUpRightOut : [
        { pos: 0, originTF: '100% 100%' },
        { pos: 100, rotate: 90, opacity: 0 }
    ],

    roDownLeftIn : [
        { pos: 0, originTF: '0 100%', rotate: -90, opacity: 0 }
    ],

    roDownRightIn : [
        { pos: 0, originTF: '100% 100%', rotate: 90, opacity: 0 }
    ],

    roUpLeftIn : [
        { pos: 0, originTF: '0 100%', rotate: 90, opacity: 0 }
    ],

    roUpRightIn : [
        { pos: 0, originTF: '100% 100%', rotate: -90, opacity: 0 }
    ],










    roSoftLeftOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 100, x: '-50%', rotateY: 70, rotateX: 30, z: -200, opacity: 0, isXYAlone: true }
    ],

    roSoftRightOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 100, x: '50%', rotateY: -70, rotateX: 30, z: -200, opacity: 0, isXYAlone: true }
    ],

    roSoftLeftIn :[
        { pos: 0, perspectiveTF: 1200, x: '-20%', rotateZ: -10, rotateY: -40, z: 500, opacity: 0 },
        { pos: 100, x: 0, rotateZ: 0, rotateY: 0, z: 0, opacity: 1, isXYAlone: true }
    ],

    roSoftRightIn :[
        { pos: 0, perspectiveTF: 1200, x: '20%', rotateZ: 10, rotateY: 40, z: 500, opacity: 0 },
        { pos: 100, x: 0, rotateZ: 0, rotateY: 0, z: 0, opacity: 1, isXYAlone: true }
    ],










    roTwistLeftOut : [
        { pos: 0, originTF: '50% 50% -400px', perspectiveTF: 800, z: -400 },
        { pos: 100, x: '-200%', rotateX: -1080, scale: 0, easing: 'easeInQuad' }
    ],

    roTwistRightOut : [
        { pos: 0, originTF: '50% 50% -400px', perspectiveTF: 800, z: -400 },
        { pos: 100, x: '200%', rotateX: 1080, scale: 0, easing: 'easeInQuad' }
    ],

    roTwistUpOut : [
        { pos: 0, originTF: '50% 50% -800px', perspectiveTF: 800, z: -800 },
        { pos: 100, y: '-200%', rotateY: -1080, scale: 0, easing: 'easeInQuad' }
    ],

    roTwistDownOut : [
        { pos: 0, originTF: '50% 50% -800px', perspectiveTF: 800, z: -800 },
        { pos: 100, y: '200%', rotateY: 1080, scale: 0, easing: 'easeInQuad' }
    ],

    roTwistLeftIn : [
        { pos: 0, originTF: '50% 50% -400px', perspectiveTF: 800, x: '-200%', z: -400, rotateX: 1080, scale: 0, opacity: 0 },
        { pos: 100, x: 0, rotateX: 0, scale: 1, opacity: 1 }
    ],

    roTwistRightIn : [
        { pos: 0, originTF: '50% 50% -400px', perspectiveTF: 800, x: '200%', z: -400, rotateX: 1080, scale: 0, opacity: 0 },
        { pos: 100, x: 0, rotateX: 0, scale: 1, opacity: 1 }
    ],

    roTwistUpIn : [
        { pos: 0, originTF: '50% 50% -800px', perspectiveTF: 800, y: '-200%', z: -800, rotateY: -1080, scale: 0, opacity: 0 },
        { pos: 100, y: 0, rotateY: 0, scale: 1, opacity: 1 }
    ],

    roTwistDownIn : [
        { pos: 0, originTF: '50% 50% -800px', perspectiveTF: 800, y: '200%', z: -800, rotateY: -1080, scale: 0, opacity: 0 },
        { pos: 100, y: 0, rotateY: 0, scale: 1, opacity: 1 }
    ],










    roWheelLeftOut : [
        { pos: 0, originTF: '50% 800%' },
        { pos: 100, rotate: -30, opacity: 0 }
    ],

    roWheelRightOut : [
        { pos: 0, originTF: '50% -800%' },
        { pos: 100, rotate: -30, opacity: 0 }
    ],

    roWheelUpOut : [
        { pos: 0, originTF: '-300% 50%' },
        { pos: 100, rotate: 30, opacity: 0 }
    ],

    roWheelDownOut : [
        { pos: 0, originTF: '300% 50%' },
        { pos: 100, rotate: 30, opacity: 0 }
    ],

    roWheelLeftIn : [
        { pos: 0, originTF: '50% -800%', rotate: 30, opacity: 0 }
    ],

    roWheelRightIn : [
        { pos: 0, originTF: '50% 800%', rotate: 30, opacity: 0 }
    ],

    roWheelUpIn : [
        { pos: 0, originTF: '300% 50%', rotate: -30, opacity: 0 }
    ],

    roWheelDownIn : [
        { pos: 0, originTF: '-300% 50%', rotate: -30, opacity: 0 }
    ],










    roFlitLeftOut : [
        { pos: [50, 100], perspectiveTF: 800, z: -2000, rotateY: -90, opacity: 0.2 }
    ],

    roFlitRightOut : [
        { pos: [50, 100], perspectiveTF: 800, z: -2000, rotateY: 90, opacity: 0.2 }
    ],

    roFlitUpOut : [
        { pos: [50, 100], perspectiveTF: 800, z: -2000, rotateX: 90, opacity: 0.2 }
    ],

    roFlitDownOut : [
        { pos: [50, 100], perspectiveTF: 800, z: -2000, rotateX: -90, opacity: 0.2 }
    ],

    roFlitLeftIn : [
        { pos: [0, 50], perspectiveTF: 800, z: -2000, rotateY: -90, opacity: 0.2 }
    ],

    roFlitRightIn : [
        { pos: [0, 50], perspectiveTF: 800, z: -2000, rotateY: 90, opacity: 0.2 }
    ],

    roFlitUpIn : [
        { pos: [0, 50], perspectiveTF: 800, z: -2000, rotateX: 90, opacity: 0.2 }
    ],

    roFlitDownIn : [
        { pos: [0, 50], perspectiveTF: 800, z: -2000, rotateX: -90, opacity: 0.2 }
    ],










    roFoldLeftOut : [
        { pos: 0, originTF: '100% 50%', perspectiveTF: 1600 },
        { pos: 100, x: '-100%', rotateY: -70, opacity: 0 }
    ],

    roFoldRightOut : [
        { pos: 0, originTF: '0 50%', perspectiveTF: 1600 },
        { pos: 100, x: '100%', rotateY: 70, opacity: 0 }
    ],

    roFoldUpOut : [
        { pos: 0, originTF: '50% 100%', perspectiveTF: 1600 },
        { pos: 100, y: '-100%', rotateX: 90, opacity: 0 }
    ],

    roFoldDownOut : [
        { pos: 0, originTF: '50% 0', perspectiveTF: 1600 },
        { pos: 100, y: '100%', rotateX: -90, opacity: 0 }
    ],

    roFoldLeftIn : [
        { pos: 0, originTF: '100% 50%', perspectiveTF: 1600, x: '-100%', rotateY: -70, opacity: 0 }
    ],

    roFoldRightIn : [
        { pos: 0, originTF: '0 50%', perspectiveTF: 1600, x: '100%', rotateY: 70, opacity: 0 }
    ],

    roFoldUpIn : [
        { pos: 0, originTF: '50% 100%', perspectiveTF: 1600, y: '-100%', rotateX: 90, opacity: 0 }
    ],

    roFoldDownIn : [
        { pos: 0, originTF: '50% 0', perspectiveTF: 1600, y: '100%', rotateX: -90, opacity: 0 }
    ],










    roRoomLeftOut : [
        { pos: 0, originTF: '100% 50%', perspectiveTF: 1200 },
        { pos: 100, x: '-100%', rotateY: 90, opacity: 0 }
    ],

    roRoomRightOut : [
        { pos: 0, originTF: '0 50%', perspectiveTF: 1200 },
        { pos: 100, x: '100%', rotateY: -90, opacity: 0 }
    ],

    roRoomUpOut : [
        { pos: 0, originTF: '50% 100%', perspectiveTF: 1200 },
        { pos: 100, y: '-100%', rotateX: -90, opacity: 0 }
    ],

    roRoomDownOut : [
        { pos: 0, originTF: '50% 0', perspectiveTF: 1200 },
        { pos: 100, y: '100%', rotateX: 90, opacity: 0 }
    ],

    roRoomLeftIn : [
        { pos: 0, originTF: '100% 50%', perspectiveTF: 1200, x: '-100%', rotateY: 90, opacity: 0 }
    ],

    roRoomRightIn : [
        { pos: 0, originTF: '0 50%', perspectiveTF: 1200, x: '100%', rotateY: -90, opacity: 0 }
    ],

    roRoomUpIn : [
        { pos: 0, originTF: '50% 100%', perspectiveTF: 1200, y: '-100%', rotateX: -90, opacity: 0 }
    ],

    roRoomDownIn : [
        { pos: 0, originTF: '50% 0', perspectiveTF: 1200, y: '100%', rotateX: 90, opacity: 0 }
    ],










    roEdgeLeftOut : [
        { pos: 0, originTF: '0 50%', perspectiveTF: 1200 },
        { pos: 100, rotateY: 90, opacity: 0 }
    ],

    roEdgeRightOut : [
        { pos: 0, originTF: '100% 50%', perspectiveTF: 1200 },
        { pos: 100, rotateY: -90, opacity: 0 }
    ],

    roEdgeUpOut : [
        { pos: 0, originTF: '50% 0', perspectiveTF: 1200 },
        { pos: 100, rotateX: -90, opacity: 0 }
    ],

    roEdgeDownOut : [
        { pos: 0, originTF: '50% 100%', perspectiveTF: 1200 },
        { pos: 100, rotateX: 90, opacity: 0 }
    ],

    roEdgeLeftIn : [
        { pos: 0, originTF: '0 50%', perspectiveTF: 1200, rotateY: 90 }
    ],

    roEdgeRightIn : [
        { pos: 0, originTF: '100% 50%', perspectiveTF: 1200, rotateY: -90 }
    ],

    roEdgeUpIn : [
        { pos: 0, originTF: '50% 0', perspectiveTF: 1200, rotateX: -90 }
    ],

    roEdgeDownIn : [
        { pos: 0, originTF: '50% 100%', perspectiveTF: 1200, rotateX: 90 }
    ],










    roEdgeSoftLeftOut : [
        { pos: 0, originTF: '0 50%', perspectiveTF: 1200 },
        { pos: 100, rotateY: 20, opacity: 0 }
    ],

    roEdgeSoftRightOut : [
        { pos: 0, originTF: '100% 50%', perspectiveTF: 1200 },
        { pos: 100, rotateY: -20, opacity: 0 }
    ],

    roEdgeSoftUpOut : [
        { pos: 0, originTF: '50% 0', perspectiveTF: 1200 },
        { pos: 100, rotateX: -20, opacity: 0 }
    ],

    roEdgeSoftDownOut : [
        { pos: 0, originTF: '50% 100%', perspectiveTF: 1200 },
        { pos: 100, rotateX: 20, opacity: 0 }
    ],










    roShortPushLeftOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 20, z: -200, opacity: 0.8 },
        { pos: 100, z: 400, rotate: -45, opacity: 0 }
    ],

    roShortPushRightOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 20, z: -200, opacity: 0.8 },
        { pos: 100, z: 400, rotate: 45, opacity: 0 }
    ],

    roShortPushLeftIn : [
        { pos: 0, perspectiveTF: 1200, z: 400, rotate: 45, opacity: 0 },
        { pos: 80, z: -200, rotate: 0, opacity: 0.8 }
    ],

    roShortPushRightIn : [
        { pos: 0, perspectiveTF: 1200, z: 400, rotate: -45, opacity: 0 },
        { pos: 80, z: -200, rotate: 0, opacity: 0.8 }
    ],

    roShortPullLeftOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 20, z: 150 },
        { pos: 100, z: -2000, rotate: -45, opacity: 0 }
    ],

    roShortPullRightOut : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 20, z: 150 },
        { pos: 100, z: -2000, rotate: 45, opacity: 0 }
    ],

    roShortPullLeftIn : [
        { pos: 0, perspectiveTF: 1200, z: -2000, rotate: 45, opacity: 0 },
        { pos: 80, z: 150, rotate: 0, opacity: 1 }
    ],

    roShortPullRightIn : [
        { pos: 0, perspectiveTF: 1200, z: -2000, rotate: -45, opacity: 0 },
        { pos: 80, z: 150, rotate: 0, opacity: 1 }
    ],










    /**
     * ATTENTIONS
     */
    wave : [
        { pos: [0, 100], perspectiveTF: 800, z: 0 },
        { pos: [25, 75], z: -100 },
        { pos: 50, z: 100 }
    ],

    juggle : [
        { pos: [0, 100], perspectiveTF: 800, z: 0, rotateY: 0 },
        { pos: 65, z: 400, rotateY: 420 }
    ],

    flatten : [
        { pos: 0, originTF: '50% 100%' },
        { pos: 25, scaleX: 0.8, skewX: 45 },
        { pos: 50, scaleX: 0.5, skewX: -30 },
        { pos: 75, scaleX: 0.3, skewX: 30 },
        { pos: 100, scaleX: 0, skewX: 0 }
    ],

    bounce : [
        { pos: [0, 20, 50, 80, 100], y: 0, x: 0, opacity: 1 },
        { pos: 40, y: -30 },
        { pos: 60, y: -15 }
    ],

    flash : [
        { pos: [0, 50, 100], opacity: 1 },
        { pos: [25, 75], opacity: 0 }
    ],

    pulse : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: 50, z: 100 }
    ],

    rubberBand : [
        { pos: 30, scaleX: 1.25, scaleY: 0.75 },
        { pos: 40, scaleX: 0.75, scaleY: 1.25 },
        { pos: 60, scaleX: 1.15, scaleY: 0.85 }
    ],

    swing : [
        { pos: 20, rotate: 15 },
        { pos: 40, rotate: -10 },
        { pos: 60, rotate: 5 },
        { pos: 80, rotate: -5 },
        { pos: 100, rotate: 0 }
    ],

    tada : [
        { pos: 0, perspectiveTF: 1200 },
        { pos: [10, 20], z: -200, rotate: -3 },
        { pos: [30, 50, 70, 90], z: 100, rotate: 3 },
        { pos: [40, 60, 80], rotate: -3 }
    ],

    wobble : [
        { pos: 15, x: '-25%', rotate: -5 },
        { pos: 30, x: '20%', rotate: 3 },
        { pos: 45, x: '-15%', rotate: -3 },
        { pos: 60, x: '10%', rotate: 2 },
        { pos: 75, x: '-5%', rotate: -1 }
    ],










    flip : [
        { pos: 0, perspectiveTF: 800 },
        { pos: 40, z: 400, rotateY: 170 },
        { pos: 50, rotateY: 190 },
        { pos: 80, z: -50, rotateY: 360 },
        { pos: 100, z: 0, rotateY: 360 }
    ],

    bobLeft : [
        { pos: 0, originTF: '0 50%', perspectiveTF: 800 },
        { pos: 25, rotateY: -30 },
        { pos: 50, rotateY: 15 },
        { pos: 75, rotateY: -15 }
    ],

    bobRight : [
        { pos: 0, originTF: '100% 50%', perspectiveTF: 800 },
        { pos: 25, rotateY: 30 },
        { pos: 50, rotateY: -15 },
        { pos: 75, rotateY: 15 }
    ],

    bobUp : [
        { pos: 0, originTF: '50% 0', perspectiveTF: 800 },
        { pos: 25, rotateX: 45 },
        { pos: 50, rotateX: -30 },
        { pos: 75, rotateX: 30 }
    ],

    bobDown : [
        { pos: 0, originTF: '50% 100%', perspectiveTF: 800 },
        { pos: 25, rotateX: -45 },
        { pos: 50, rotateX: 30 },
        { pos: 75, rotateX: -30 }
    ],

    ringLeft : [
        { pos: 0, originTF: '50% 50% -200px', perspectiveTF: 800, z: -200 },
        { pos: 100, rotateY: -360 }
    ],

    ringRight : [
        { pos: 0, originTF: '50% 50% -200px', perspectiveTF: 800, z: -200 },
        { pos: 100, rotateY: 360 }
    ],

    ringUp : [
        { pos: 0, originTF: '50% 50% -200px', perspectiveTF: 800, z: -200 },
        { pos: 100, rotateX: 360 }
    ],

    ringDown : [
        { pos: 0, originTF: '50% 50% -200px', perspectiveTF: 800, z: -200 },
        { pos: 100, rotateX: -360 }
    ],










    shake : [
        { pos: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90], x: 0, y: 0, rotate: 0 },
        { pos: [1, 11, 21, 31, 41, 51, 61, 71, 81, 91], x: 2, y: -2, rotate: -1, easing: 'easeInOutQuad' },
        { pos: [2, 12, 22, 32, 42, 52, 62, 72, 82, 92], y: -1, rotate: 1 },
        { pos: [3, 13, 23, 33, 43, 53, 63, 73, 83, 93], x: -1, rotate: -2 },
        { pos: [4, 14, 24, 34, 44, 54, 64, 74, 84, 94], x: -3, y: 2, rotate: -1 },
        { pos: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95], x: 2, rotate: -2 },
        { pos: [6, 16, 26, 36, 46, 56, 66, 76, 86, 96], x: -1, y: -2, rotate: -1 },
        { pos: [7, 17, 27, 37, 47, 57, 67, 77, 87, 97], x: 1, y: -3, rotate: -2 },
        { pos: [8, 18, 28, 38, 48, 58, 68, 78, 88, 98], x: -3, rotate: 1 },
        { pos: [9, 19, 29, 39, 49, 59, 69, 79, 89, 99], x: 2, rotate: -2 }
    ],

    shakeSlow : [
        { pos: 10, x: -7, y: -9, rotate: 1 },
        { pos: 20, x: -2, y: 7, rotate: -3, easing: 'easeInOutQuad' },
        { pos: 30, x: -3, y: 6, rotate: 3 },
        { pos: 40, x: 1, y: -3, rotate: -4 },
        { pos: 50, x: 2, y: -6, rotate: 2 },
        { pos: 60, x: -9, y: 6, rotate: -4 },
        { pos: 70, x: 9, y: 8 },
        { pos: 80, x: -7, y: -8, rotate: 3 },
        { pos: 90, x: -6, y: -4, rotate: -2 }
    ],

    shakeLittle : [
        { pos: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90], x: 0, y: 0, rotate: 0 },
        { pos: [1, 11, 21, 31, 41, 51, 61, 71, 81, 91], x: -1, y: -1, rotate: -1, easing: 'easeInOutQuad' },
        { pos: [2, 12, 22, 32, 42, 52, 62, 72, 82, 92], x: 0 },
        { pos: [3, 13, 23, 33, 43, 53, 63, 73, 83, 93], x: -1, rotate: 0 },
        { pos: [4, 14, 24, 34, 44, 54, 64, 74, 84, 94], x: 0, y: 0, rotate: 0 },
        { pos: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95], y: -1, rotate: -1 },
        { pos: [6, 16, 26, 36, 46, 56, 66, 76, 86, 96], x: -1, y: 0 },
        { pos: [7, 17, 27, 37, 47, 57, 67, 77, 87, 97], x: 0 },
        { pos: [8, 18, 28, 38, 48, 58, 68, 78, 88, 98], x: -1, rotate: 0 },
        { pos: [9, 19, 29, 39, 49, 59, 69, 79, 89, 99], x: 0, y: -1, rotate: -1 }
    ],

    shakeHard : [
        { pos: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90], x: 0, y: 0, rotate: 0 },
        { pos: [1, 11, 21, 31, 41, 51, 61, 71, 81, 91], x: -7, y: 6, rotate: -1, easing: 'easeInOutQuad' },
        { pos: [2, 12, 22, 32, 42, 52, 62, 72, 82, 92], x: 7, y: -8, rotate: 1 },
        { pos: [3, 13, 23, 33, 43, 53, 63, 73, 83, 93], x: -3, y: 7, rotate: 2 },
        { pos: [4, 14, 24, 34, 44, 54, 64, 74, 84, 94], y: -7, rotate: 1 },
        { pos: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95], x: 9, y: -2, rotate: 3 },
        { pos: [6, 16, 26, 36, 46, 56, 66, 76, 86, 96], x: 5, y: -1, rotate: -2 },
        { pos: [7, 17, 27, 37, 47, 57, 67, 77, 87, 97], x: 0, y: 6, rotate: -4 },
        { pos: [8, 18, 28, 38, 48, 58, 68, 78, 88, 98], x: 7, y: 9, rotate: -1 },
        { pos: [9, 19, 29, 39, 49, 59, 69, 79, 89, 99], x: -10, y: -9, rotate: 2 }
    ],

    shakeHor : [
        { pos: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90], x: 0 },
        { pos: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99], x: -8, easing: 'easeInOutQuad' },
        { pos: [2, 4, 6, 8, 12, 14, 16, 18, 22, 24, 26, 28, 32, 34, 36, 38, 42, 44, 46, 48, 52, 54, 56, 58, 62, 64, 66, 68, 72, 74, 76, 78, 82, 84, 86, 88, 92, 94, 96, 98], x: 8 }
    ],

    shakeVer : [
        { pos: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90], x: 0 },
        { pos: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99], y: -8, easing: 'easeInOutQuad' },
        { pos: [2, 4, 6, 8, 12, 14, 16, 18, 22, 24, 26, 28, 32, 34, 36, 38, 42, 44, 46, 48, 52, 54, 56, 58, 62, 64, 66, 68, 72, 74, 76, 78, 82, 84, 86, 88, 92, 94, 96, 98], y: 8 }
    ],

    shakeRotate : [
        { pos: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90], rotate: 0 },
        { pos: [1.5, 4.5, 7.5, 11.5, 14.5, 17.5, 21.5, 24.5, 27.5, 31.5, 34.5, 37.5, 41.5, 44.5, 47.5, 51.5, 54.5, 57.5, 61.5, 64.5, 67.5, 71.5, 74.5, 77.5, 81.5, 84.5, 87.5, 91.5, 94.5, 97.5], rotate: -5, easing: 'easeInOutQuad' },
        { pos: [3, 6, 9, 13, 16, 19, 23, 26, 29, 33, 36, 39, 43, 46, 49, 53, 56, 59, 63, 66, 69, 73, 76, 79, 83, 86, 89, 93, 96, 99], rotate: 5 }
    ],

    shakeOpacity : [
        { pos: [0, 20, 40, 60, 80], x: 0, y: 0, rotate: 0, opacity: 0.2 },
        { pos: [4, 24, 44, 64, 84], x: -5, y: -2, rotate: 2, opacity: 0.9, easing: 'easeInOutQuad' },
        { pos: [8, 28, 48, 68, 88], x: -1, y: 2, rotate: -3, opacity: 0.4 },
        { pos: [12, 32, 52, 72, 92], x: -5, y: -4, rotate: -1, opacity: 0 },
        { pos: [16, 36, 56, 76, 96], x: -5, y: 2, rotate: 1, opacity: 0.6 }
    ],

    shakeCrazy : [
        { pos: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90], x: 0, y: 0, rotate: 0, opacity: 0.1 },
        { pos: [2, 12, 22, 32, 42, 52, 62, 72, 82, 92], x: -19, y: -15, rotate: -8, opacity: 0.5, easing: 'easeInOutQuad' },
        { pos: [4, 14, 24, 34, 44, 54, 64, 74, 84, 94], x: 15, y: 5, rotate: 6, opacity: 0.4 },
        { pos: [6, 16, 26, 36, 46, 56, 66, 76, 86, 96], x: -12, y: 11, rotate: -7, opacity: 0 },
        { pos: [8, 18, 28, 38, 48, 58, 68, 78, 88, 98], x: -10, y: -13, rotate: 5, opacity: 0.6 }
    ],










    none : [
        { pos: [10, 100], opacity: 0 }
    ]
};










/**
 * RUBY ANIMATE ONE
 */
window.__rubyAnimateOne__ = {

    glueHor : {
        next : [ 'glueLeftOut', 'slideOneRightIn' ],
        prev : [ 'glueRightOut', 'slideOneLeftIn' ]
    },

    glueVer : {
        next : [ 'glueUpOut', 'slideOneDownIn' ],
        prev : [ 'glueDownOut', 'slideOneUpIn' ]
    },

    foldHor : {
        next : [ 'roFoldLeftOut', 'roFoldRightIn' ],
        prev : [ 'roFoldRightOut', 'roFoldLeftIn' ]
    },

    foldVer : {
        next : [ 'roFoldUpOut', 'roFoldDownIn' ],
        prev : [ 'roFoldDownOut', 'roFoldUpIn' ]
    },

    foldFromHor : {
        next : [ 'roFoldLeftOut', 'slideOneRightIn' ],
        prev : [ 'roFoldRightOut', 'slideOneLeftIn' ],
        isMask : true
    },

    foldFromVer : {
        next : [ 'roFoldUpOut', 'slideOneDownIn' ],
        prev : [ 'roFoldDownOut', 'slideOneUpIn' ],
        isMask : true
    },

    roomHor : {
        next : [ 'roRoomLeftOut', 'roRoomRightIn' ],
        prev : [ 'roRoomRightOut', 'roRoomLeftIn' ]
    },

    roomVer : {
        next : [ 'roRoomUpOut', 'roRoomDownIn' ],
        prev : [ 'roRoomDownOut', 'roRoomUpIn' ]
    },

    flitHor : {
        next : [ 'roFlitRightOut', 'roFlitLeftIn' ],
        prev : [ 'roFlitLeftOut', 'roFlitRightIn' ]
    },

    flitVer : {
        next : [ 'roFlitUpOut', 'roFlitDownIn' ],
        prev : [ 'roFlitDownOut', 'roFlitUpIn' ]
    },

    hinge : {
        next : [ 'hingeLeft', 'fadeSlowIn'],
        prev : [ 'hingeRight', 'fadeSlowIn']
    },

    roll : {
        next : [ 'rollLeftOut', 'rollRightIn' ],
        prev : [ 'rollRightOut', 'rollLeftIn' ]
    },











    moveHor : {
        next : [ 'slideOneLeftOut', 'slideOneRightIn' ],
        prev : [ 'slideOneRightOut', 'slideOneLeftIn' ],
        isMask : true
    },

    moveVer : {
        next : [ 'slideOneUpOut', 'slideOneDownIn' ],
        prev : [ 'slideOneDownOut', 'slideOneUpIn' ],
        isMask : true
    },

    fade : {
        next : [ 'fadeOut', 'fadeIn' ],
        prev : [ 'fadeOut', 'fadeIn' ]
    },

    fadeHor : {
        next : [ 'fadeOut', 'slideOneRightIn' ],
        prev : [ 'fadeOut', 'slideOneLeftIn' ],
        isMask : true
    },

    fadeVer : {
        next : [ 'fadeOut', 'slideOneDownIn' ],
        prev : [ 'fadeOut', 'slideOneUpIn' ],
        isMask : true
    },

    scaleOutHor : {
        next : [ 'pullOut', 'slideOneRightIn' ],
        prev : [ 'pullOut', 'slideOneLeftIn' ],
        isMask : true
    },

    scaleOutVer : {
        next : [ 'pullOut', 'slideOneDownIn' ],
        prev : [ 'pullOut', 'slideOneUpIn' ],
        isMask : true
    },

    scaleInHor : {
        next : [ 'slideOneLeftOut', 'pullIn' ],
        prev : [ 'slideOneRightOut', 'pullIn' ],
        isMask : true
    },

    scaleInVer : {
        next : [ 'slideOneUpOut', 'pullIn' ],
        prev : [ 'slideOneDownOut', 'pullIn' ],
        isMask : true
    },

    scalePulse : {
        next : [ 'pushOut', 'pullIn' ],
        prev : [ 'pullOut', 'pushIn' ],
        isMask : false
    },

    scaleWave : {
        next : [ 'pullOut', 'pullIn' ],
        prev : [ 'pullOut', 'pullIn' ]
    },

    roEdgeHor : {
        next : [ 'roEdgeLeftOut', 'roEdgeRightIn' ],
        prev : [ 'roEdgeRightOut', 'roEdgeLeftIn' ]
    },

    roEdgeVer : {
        next : [ 'roEdgeUpOut', 'roEdgeDownIn' ],
        prev : [ 'roEdgeDownOut', 'roEdgeUpIn' ]
    },

    newspaper : {
        next : [ 'fadeSlowOut', 'newspaperIn' ],
        prev : [ 'newspaperOut', 'fadeSlowIn' ]
    },

    pushFromHor : {
        next : [ 'roEdgeLeftOut', 'slideOneRightIn' ],
        prev : [ 'roEdgeRightOut', 'slideOneLeftIn' ],
        isMask : true
    },

    pushFromVer : {
        next : [ 'roEdgeUpOut', 'slideOneDownIn' ],
        prev : [ 'roEdgeDownOut', 'slideOneUpIn' ],
        isMask : true
    },

    slide : {
        next : [ 'slidePullLeftOut', 'slidePullRightIn' ],
        prev : [ 'slidePullRightOut', 'slidePullLeftIn' ]
    },












    fall : {
        next : [ 'slideFadeDownOut', 'pullIn' ],
        prev : [ 'pullOut', 'slideFadeUpIn' ]
    },

    pulseShort : {
        next : [ 'roShortPushRightOut', 'roShortPullRightIn' ],
        prev : [ 'roShortPushLeftOut', 'roShortPullLeftIn' ]
    },

    roSoft : {
        next : [ 'roSoftLeftOut', 'slideRightIn' ],
        prev : [ 'roSoftRightOut', 'slideLeftIn' ]
    },

    roDeal : {
        next : [ 'pullOut', 'roSoftRightIn' ],
        prev : [ 'pullOut', 'roSoftLeftIn' ]
    },

    wheelHor : {
        next : [ 'roWheelLeftOut', 'roWheelRightIn' ],
        prev : [ 'roWheelRightOut', 'roWheelLeftIn' ]
    },

    wheelVer : {
        next : [ 'roWheelDownOut', 'roWheelUpIn' ],
        prev : [ 'roWheelUpOut', 'roWheelDownIn' ]
    },

    snakeHor : {
        next : [ 'slideShakeLeftOut', 'slideShakeRightIn' ],
        prev : [ 'slideShakeRightOut', 'slideShakeLeftIn' ]
    },

    snakeVer : {
        next : [ 'slideShakeUpOut', 'slideShakeDownIn' ],
        prev : [ 'slideShakeDownOut', 'slideShakeUpIn' ]
    },

    shuffle : {
        next : [ 'fanBehindDown', 'fanFrontUp' ],
        prev : [ 'fanBehindUp', 'fanFrontDown' ]
    },

    browseLeft : {
        next : [ 'moveLeftBehind', 'pullBounceIn' ],
        prev : [ 'pullBounceOut', 'moveLeftFront' ]
    },

    browseRight : {
        next : [ 'moveRightBehind', 'pullBounceIn' ],
        prev : [ 'pullBounceOut', 'moveRightFront' ]
    },

    slideBehind : {
        next : [ 'moveShortLeftBehind', 'moveShortRightFront' ],
        prev : [ 'moveShortRightBehind', 'moveShortLeftFront' ]
    },

    vacuumHor : {
        next : [ 'slideScaleLeftOut', 'slideScaleRightIn' ],
        prev : [ 'slideScaleRightOut', 'slideScaleLeftIn' ]
    },

    vacuumVer : {
        next : [ 'slideScaleUpOut', 'slideScaleDownIn' ],
        prev : [ 'slideScaleDownOut', 'slideScaleUpIn' ]
    },











    scaleSoft : {
        next : [ 'pushSoftOut', 'pullSoftIn' ],
        prev : [ 'pullSoftOut', 'pushSoftIn' ]
    },

    snapHor : {
        next : [ 'slideShortLeftOut', 'slideRightIn' ],
        prev : [ 'slideShortRightOut', 'slideLeftIn' ]
    },

    snapVer : {
        next : [ 'slideShortUpOut', 'slideDownIn' ],
        prev : [ 'slideShortDownOut', 'slideUpIn' ]
    },

    letInHor : {
        next : [ 'roEdgeSoftLeftOut', 'slideRightIn' ],
        prev : [ 'roEdgeSoftRightOut', 'slideLeftIn' ]
    },

    letInVer : {
        next : [ 'roEdgeSoftUpOut', 'slideDownIn' ],
        prev : [ 'roEdgeSoftDownOut', 'slideUpIn' ]
    },

    stickHor : {
        next : [ 'slideRightOut', 'glueLeftIn' ],
        prev : [ 'slideLeftOut', 'glueRightIn' ]
    },

    stickVer : {
        next : [ 'slideDownOut', 'glueUpIn' ],
        prev : [ 'slideUpOut', 'glueDownIn' ]
    },

    growthHor : {
        next : [ 'pullSoftOut', 'soEdgeRightIn' ],
        prev : [ 'pullSoftOut', 'soEdgeLeftIn' ]
    },

    growthVer : {
        next : [ 'pullSoftOut', 'soEdgeDownIn' ],
        prev : [  ]
    },

    soEdgeHor : {
        next : [ 'soEdgeLeftOut', 'soEdgeRightIn' ],
        prev : [ 'soEdgeRightOut', 'soEdgeLeftIn' ]
    },

    soEdgeVer : {
        next : [ 'soEdgeUpOut', 'soEdgeDownIn' ],
        prev : [ 'soEdgeDownOut', 'soEdgeUpIn' ]
    },

    shake : {
        next : [ 'fadeSlowOut', 'shake' ],
        prev : [ 'fadeSlowOut', 'shake' ]
    },

    tinHor : {
        next : [ 'slideLeftOut', 'slideTinRightIn' ],
        prev : [ 'slideRightOut', 'slideTinLeftIn' ]
    },

    tinVer : {
        next : [ 'slideUpOut', 'slideTinDownIn' ],
        prev : [ 'slideDownOut', 'slideTinUpIn' ]
    },











    _default_ : {
        next : [ '', '' ],
        prev : [ '', '' ]
    }
};
}());
