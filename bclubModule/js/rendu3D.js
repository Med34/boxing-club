var Rendu3D = function() {
    this.idDiv = "roomTest"
    this.scene;
    this.renderer;
    this.camera;
    this.ground;
    this.initCamera = function() {
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 100, 200);
    };
    this.initScene = function() {
        this.scene = new THREE.Scene();
        this.scene.add(this.camera);
        this.scene.add(this.ground);
    };
    this.addGround = function() {
        var groundGeometry = new THREE.BoxGeometry(350, 1, 350);
        var groundTexture = new THREE.TextureLoader().load("stone-ground.png");
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        var groundMaterial = new THREE.MeshBasicMaterial({
            map: groundTexture,
            overdraw: 0.5
        });
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
    };
    this.createRender = function() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor( 0xFFFFFF, 1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
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
        this.initScene();
        this.createRender();
    };
}
