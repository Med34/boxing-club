var Rendu3D = function() {
    this.idDiv = "display3D";
    this.scene;
    this.renderer;
    this.camera;
    this.ground;
    this.walls = [];
    this.meshGround = new THREE.Object3D();
    this.meshWalls = new THREE.Object3D();
    this.initCamera = function() {
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 75, 200);
    };
    this.initScene = function() {
        this.scene = new THREE.Scene();
        this.scene.add(this.meshGround);
        this.scene.add(this.meshWalls);
    };
    this.addGround = function() {
        var ground = new THREE.PlaneGeometry(512, 1024);
        var material = new THREE.MeshBasicMaterial({color: 0xFF0000});
        this.ground = new THREE.Mesh(ground, material);
        this.ground.rotation.x = -Math.PI / 2;
        this.meshGround.add(this.ground);
    };
    this.addWalls = function() {
        var material = new THREE.MeshBasicMaterial({color: 0xFF0000});
        var walls = [
            new THREE.PlaneGeometry(this.ground.height, 128),
            new THREE.PlaneGeometry(this.ground.width, 128),
            new THREE.PlaneGeometry(this.ground.height, 128),
            new THREE.PlaneGeometry(this.ground.width, 128)
        ];
        for (var i = 0; i < walls.length; i += 1) {
            this.walls[i] = new THREE.Mesh(walls[i], material);
            this.walls[i].position.y = 128 / 2;
            this.meshWalls.add(this.walls[i]);
        }
        this.walls[0].rotation.y = -Math.PI / 2;
        this.walls[0].position.x = this.ground.width / 2;
        this.walls[1].rotation.y = Math.PI;
        this.walls[1].position.z = this.ground.height / 2;
        this.walls[2].rotation.y = Math.PI / 2;
        this.walls[2].position.x = -this.ground.width / 2;
        this.walls[3].position.z = -this.ground.height / 2;
    };
    this.createRender = function() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor( 0xFFFFFF, 1);
        this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
        document.getElementById(this.idDiv).appendChild(this.renderer.domElement);
    };
    this.animate = function() {
        var that = this;
        requestAnimationFrame( function() { that.animate(); } );
        that.renderer.render(this.scene, this.camera);
    };
    this.getRendu = function() {
        this.initCamera();
        this.addGround();
        this.addWalls();
        this.initScene();
        this.createRender();
    };
}
