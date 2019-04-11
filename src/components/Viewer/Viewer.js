import React, {Component} from "react";

import * as THREE from "three";
import STLLoader from "../../three/STLLoader";
import Fab from '@material-ui/core/Fab';
import LinearProgress from '@material-ui/core/LinearProgress';
import './Viewer.css';

// var STLLoader = require('three-stl-loader')(THREE);
var OrbitControls = require('three-orbit-controls')(THREE);


const promisifyLoad = (loader) => {
  function onProgress(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  }

  return url => new Promise((resolve, reject) => {
    loader.load(url, resolve, onProgress, reject);
  });
};

class Viewer extends Component {
  state = {
    activeIndex: 0,
    isLoading: 1,
  };

  componentDidMount() {
    this.init();
  }

  // componentWillUpdate(nextProps, nextState) {
  //   const {cameraPosition} = nextState;
  //   console.log(cameraPosition);
  //   this.camera.position.copy(cameraPosition);
  //   this.pointLight.position.copy(cameraPosition);
  // }

  init_camera = () => {
    this.camera.position.x=-1.7;
    this.camera.position.y=28;
    this.camera.position.z=82;
  }
  
  init = () => {
    const {width, height} = this.getRendererSize();

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x808080);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    this.init_camera();
    // this.camera.up = new THREE.Vector3(0, 0, 0.5);
    // this.camera.position.copy(this.state.cameraPosition);

    
    this.light = new THREE.HemisphereLight(0xE8E8E8,0x000000,1);
    this.light.position.set(0,0,0);
    this.scene.add(this.light);
    this.controls = new OrbitControls(this.camera);
    // this.controls.enablePan = false;
    
    this.stlLoader = new STLLoader();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    this.yGrid = new THREE.GridHelper( 1000, 50 );

    this.scene.add(this.yGrid)

    this.root.appendChild(this.renderer.domElement);
    requestAnimationFrame(this.animate);
    window.addEventListener('resize', this.handleResize);

    this.mesh_arr = [];

    // Load all compress stl files and store to mesh_arr
    this.loadStl(0);

  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    this.light.position.copy(this.camera.getWorldPosition());

    this.renderScene();
  };

  handleResize = () => {
    const {width, height} = this.getRendererSize();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  };


  getRendererSize() {
    const p = 0.8;
    const width = window.innerWidth * p;
    const height = window.innerHeight * p;

    return {width, height};
  }

  activeStl(index) {
    if ( this.state.isLoading ) 
      return;
    this.scene.remove(this.mesh_arr[this.state.activeIndex]);
    this.setState({activeIndex: index, isLoading: 0});
    // this.init_camera();
    this.scene.add(this.mesh_arr[index]);
  }

  // Load all compressed stl files step by step and store to mesh_arr
  loadStl(index) {
    const stlLoader = new STLLoader();
    var scope = this;

      stlLoader.load(this.props.url_arr[index], function(geometry) {
          geometry.computeFaceNormals();
          geometry.computeVertexNormals();
          geometry.center();
          var material = new THREE.MeshPhongMaterial({color:0xFFFFFF});
          scope.mesh_arr[index] = new THREE.Mesh(geometry, material);
      }, function(xhr) { // onProgress
        if ((xhr.loaded / xhr.total) === 1) {

          if ( index === scope.props.url_arr.length - 1 ) {
            // console.log('loading completed');
            scope.setState({activeIndex: 0, isLoading: 0});
            scope.activeStl(0);
            return;
          }
          scope.loadStl(index + 1);
        }
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      }, function(err) { // onError
        console.log(err);
      })
    

    // return promisifyLoad(stlLoader)(objectUri);
  }

  showObject = (index) => {
      this.activeIndex = index;
      this.loadStl(index);
      this.init_camera();
      this.setState({activeIndex: index, isLoading: 0});
      // this.state.isLoading = 0;
      console.log(this.controls);
    }
  render() {

    return (
      <div>
        
        <div
          className="Viewer"
          ref={(root) => {
            this.root = root;
          }}
        >
        </div>
        {this.state.isLoading === 1 && <div className='progress-bar'>
          <LinearProgress />
        </div>}
        
        <div className="btn-panel">
            {
              this.props.url_arr.map((url, i) => {
                return this.state.activeIndex === i ? <Fab size="small" color="secondary" onClick={() => this.activeStl(i)}>{i+1}</Fab> : <Fab size="small" color="primary" onClick={() => this.activeStl(i)}>{i+1}</Fab>
              })}
        </div>
      </div>
    );
  }
}

Viewer.propTypes = {};

export default Viewer;