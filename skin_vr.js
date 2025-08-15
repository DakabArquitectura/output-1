// Garden Gnome Software - VR - Skin
// Pano2VR 7.1.9/20995
// Filename: venis_vr2.ggsk
// Generated 2025-08-15T13:56:52

function pano2vrVrSkin(player,base) {
	var me=this;
	var skin=this;
	var flag=false;
	var vrSkinAdded=false;
	var skinKeyPressed = 0;
	this.player=player;
	this.player.vrSkinObj=this;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown={};
	this.elementMouseOver={};
	var i;
	var hs,el,els,elo,ela,geometry,material;
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.userData.ggId)) r.push(e);
			} else {
				if (e.userData.ggId==id) r.push(e);
			}
			if (e.children.length > 0) {
				for(var i=0;i<e.children.length;i++) {
					stack.push(e.children[i]);
				}
			}
		}
		return r;
	}
	
	this.posInSkin=function(el, clonerParent) {
		var curParent = el.parent;
		var pos = {x: el.position.x, y: el.position.y};
		while (curParent && curParent != me.skinGroup) {
			pos.x += curParent.position.x;
			pos.y += curParent.position.y;
			if (curParent.parent) {
				curParent = curParent.parent;
			} else {
				curParent = clonerParent
			}
		}
		return pos;
	}
	
	this._=function(text, params) {
		return player._(text, params);
	}
	this.languageChanged=function() {
		if (!me.skinGroup) return;
		var stack=[];
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.userData && e.userData.ggUpdateText) {
				e.userData.ggUpdateText();
			}
			for(var i=0;i<e.children.length;i++) {
				stack.push(e.children[i]);
			}
		}
	}
	player.addListener('languagechanged', this.languageChanged);
	this.getElementVrPosition = function(el, x, y) {
		var vrPos = {};
		var renderableEl = el.parent && (el.parent.type == 'Mesh' || el.parent.type == 'Group');
		switch (el.userData.hanchor) {
			case 0:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) - ((renderableEl ? el.parent.userData.width : 800) / 200.0) + (x / 100.0) + (el.userData.width / 200.0);
			break;
			case 1:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + (x / 100.0);
			break;
			case 2:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + ((renderableEl ? el.parent.userData.width : 800) / 200.0) - (x / 100.0) - (el.userData.width / 200.0);
			break;
		}
		switch (el.userData.vanchor) {
			case 0:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) + ((renderableEl ? el.parent.userData.height : 600) / 200.0) - (y / 100.0) - (el.userData.height / 200.0);
			break;
			case 1:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - (y / 100.0);
			break;
			case 2:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - ((renderableEl ? el.parent.userData.height : 600) / 200.0) + (y / 100.0) + (el.userData.height / 200.0);
			break;
		}
		vrPos.x += el.userData.curScaleOffX;
		vrPos.y += el.userData.curScaleOffY;
		return vrPos;
	}
	this.skin_nodechangeCallback = function() {
		me.ggUserdata=player.userdata;
	};
	this.addSkin=function() {
		if (me.vrSkinAdded) return;
		me.vrSkinAdded = true;
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		this.skinGroup=player.getSkinGroup();
		el = new THREE.Group();
		width = 2.54;
		height = 1.96;
		borderShape = new THREE.Shape();
		borderShape.moveTo((-width / 2.0) - 0.01 + 0, (height / 2.0) + 0.01);
		borderShape.lineTo((width / 2.0) + 0.01 - 0, (height / 2.0) + 0.01);
		borderShape.lineTo((width / 2.0) + 0.01, (-height / 2.0) - 0.01 + 0);
		borderShape.lineTo((-width / 2.0) - 0.01 + 0, (-height / 2.0) - 0.01);
		borderShape.lineTo((-width / 2.0) - 0.01, (height / 2.0) + 0.01 - 0);
		innerShape = new THREE.Path();
		innerShape.moveTo((-width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (-height / 2.0));
		innerShape.lineTo((-width / 2.0), (-height / 2.0));
		borderShape.holes.push(innerShape);
		borderGeometry = new THREE.ShapeGeometry(borderShape);
		borderGeometry.name = 'Map 1_borderGeometry';
		borderMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(0, 0, 0).convertSRGBToLinear(), side: THREE.DoubleSide, transparent: true } );
		borderMaterial.name = 'Map 1_borderMaterial';
		el.userData.border = new THREE.Mesh( borderGeometry, borderMaterial );
		el.userData.border.name = 'Map 1_borderMesh';
		el.add(el.userData.border);
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._map_1.userData.border.material.opacity = v * me._map_1.userData.borderColorAlpha;
			if (me._map_1.userData.ggSubElement) {
				me._map_1.userData.ggSubElement.material.opacity = v
				me._map_1.userData.ggSubElement.visible = (v>0 && me._map_1.userData.visible);
			}
			me._map_1.visible = (v>0 && me._map_1.userData.visible);
		}
		el.userData.setBorderColor = function(v) {
			me._map_1.userData.border.material.color = v;
		}
		el.userData.setBorderColorAlpha = function(v) {
			me._map_1.userData.borderColorAlpha = v;
			me._map_1.userData.setOpacity(me._map_1.userData.opacity);
		}
		el.translateX(-2.49);
		el.translateY(1.73);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 254;
		el.userData.height = 196;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'Map 1';
		el.userData.x = -2.49;
		el.userData.y = 1.73;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._map_1.visible
			let parentEl = me._map_1.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._map_1.userData.opacity = v;
			v = v * me._map_1.userData.parentOpacity;
			me._map_1.userData.setOpacityInternal(v);
			for (let i = 0; i < me._map_1.children.length; i++) {
				let child = me._map_1.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._map_1.userData.parentOpacity = v;
			v = v * me._map_1.userData.opacity
			me._map_1.userData.setOpacityInternal(v);
			for (let i = 0; i < me._map_1.children.length; i++) {
				let child = me._map_1.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._map_1 = el;
		el.userData.ggId="Map 1";
		me._map_1.userData.ggUpdatePosition=function (useTransition) {
		}
		me.skinGroup.add(me._map_1);
		me._map_1.userData.setOpacity(1.00);
		me.eventchangenodeCallback = function() {
			me.skin_nodechangeCallback();
		};
		player.addListener('changenode', me.eventchangenodeCallback);
	};
	this.removeSkin=function() {
	};
	me.skinTimerEvent=function() {
		if (!player.isInVR()) return;
		me.ggCurrentTime=new Date().getTime();
	};
	player.addListener('timer', me.skinTimerEvent);
	player.addListener('vrconfigloaded', function() { me.addSkin();if (me.eventconfigloadedCallback) me.eventconfigloadedCallback();if (me.eventchangenodeCallback) me.eventchangenodeCallback();});
	player.addListener('exitvr', function() { me.removeSkin(); });
	me.skinTimerEvent();
};