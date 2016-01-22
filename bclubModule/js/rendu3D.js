var Rendu3D = function() {
    this.idDiv = "display3D";
    this.scene;
    this.renderer;
    this.camera;
    this.ground;
    this.walls = [];
    this.meshGround = new THREE.Object3D();
    this.meshWalls = new THREE.Object3D();
    this.directions = {};
    this.directions.forward = false;
    this.directions.backward = false;
    this.directions.left = false;
    this.directions.right = false;
    this.camright = new THREE.Vector3();
    this.camup = new THREE.Vector3();
    this.camat = new THREE.Vector3();
    this.rotation = 0;
    this.height = 300;
    this.width = 500;

    this.initCamera = function() {
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 75, 200);
        this.camera.matrix.extractBasis(this.camright, this.camup, this.camat);
    };
    this.initScene = function() {
        this.scene = new THREE.Scene();
        this.scene.add(this.meshGround);
        this.scene.add(this.meshWalls);
    };
    this.addGround = function() {
        var ground = new THREE.PlaneGeometry(this.width, this.height);
        var groundTexture = new THREE.TextureLoader().load("images/stone-ground.png");
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        var groundMaterial = new THREE.MeshBasicMaterial({
            map: groundTexture,
            overdraw: 0.5
        });
        this.ground = new THREE.Mesh(ground, groundMaterial);
        this.ground.rotation.x = -Math.PI / 2;
        this.meshGround.add(this.ground);
    };
    this.addWalls = function() {
        var wallTextures = new THREE.TextureLoader().load("images/bricks.jpg");
        wallTextures.wrapS = wallTextures.wrapT = THREE.RepeatWrapping;
        var wallMaterial = new THREE.MeshBasicMaterial({
            map: wallTextures,
            overdraw: 0.5
        });
        var walls = [
            new THREE.PlaneGeometry(this.height, 128),
            new THREE.PlaneGeometry(this.width, 128),
            new THREE.PlaneGeometry(this.height, 128),
            new THREE.PlaneGeometry(this.width, 128)
        ];
        for (var i = 0; i < walls.length; i += 1) {
            this.walls[i] = new THREE.Mesh(walls[i], wallMaterial);
            this.walls[i].position.y = 128 / 2;
            this.meshWalls.add(this.walls[i]);
        }
        this.walls[0].rotation.y = -Math.PI / 2;
        this.walls[0].position.x = this.width / 2;
        this.walls[1].rotation.y = Math.PI;
        this.walls[1].position.z = this.height / 2;
        this.walls[2].rotation.y = Math.PI / 2;
        this.walls[2].position.x = -this.width / 2;
        this.walls[3].position.z = -this.height / 2;
    };
    this.createRender = function() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor( 0xFFFFFF, 1);
        this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
        document.getElementById(this.idDiv).appendChild(this.renderer.domElement);
    };
    this.onKeyDown = function(e) {
        switch(e.keyCode) {
            case 37: // Left
                this.directions.left = true;
            break;
            case 38: // Up
                this.directions.forward = true;
            break;
            case 39: // Right
                this.directions.right = true;
            break;
            case 40: // Down
                this.directions.backward = true;
            break;
        }
    };
    this.onKeyUp = function(e) {
        switch(e.keyCode) {
            case 37: // Left
                this.directions.left = false;
            break;
            case 38: // Up
                this.directions.forward = false;
            break;
            case 39: // Right
                this.directions.right = false;
            break;
            case 40: // Down
                this.directions.backward = false;
            break;
        }
    }
    this.onMouseMove = function(event) {
        var box = {};
        box.minX = Math.abs(window.innerWidth - 400) / 2;
        box.maxX = box.minX + 400;

        if(event.clientX < box.minX) {
            this.rotation = Math.min(0.1, 0.0001 * (box.minX - event.clientX));
        }
        else if(event.clientX > box.maxX) {
            this.rotation = Math.max(-0.1, -0.0001 * (event.clientX - box.maxX));
        }
        else {
            this.rotation = 0;
        }
    };
    this.animate = function() {
        var that = this;
        requestAnimationFrame( function() { that.animate(); } );
        this.camera.rotation.y += this.rotation;
        this.camera.matrix.extractBasis(this.camright, this.camup, this.camat);
        if(this.directions.forward) {
            this.camera.position.add(this.camat.multiplyScalar(-5));
            this.camera.matrix.extractBasis(this.camright, this.camup, this.camat);
        }
        if(this.directions.backward) {
            this.camera.position.add(this.camat.multiplyScalar(5));
            this.camera.matrix.extractBasis(this.camright, this.camup, this.camat);
        }
        if(this.directions.left) {
            this.camera.position.add(this.camright.multiplyScalar(-5));
            this.camera.matrix.extractBasis(this.camright, this.camup, this.camat);
        }
        if(this.directions.right) {
            this.camera.position.add(this.camright.multiplyScalar(5));
            this.camera.matrix.extractBasis(this.camright, this.camup, this.camat);
        }

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
