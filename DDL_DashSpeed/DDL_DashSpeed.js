//=============================================================================
// DDL_DashSpeed.js
//=============================================================================

var Imported = Imported || {};
Imported.DDL_DashSpeed = true;

var DDL = DDL || {};
DDL.DashSpeed = {};

/*:
 * @plugindesc 캐릭터 대쉬 속도 변경
 * v1.0.0
 * @author ㅓㅇ, DDL (d-dl.tistory.com)
 *
 * @param 기본값
 * @desc 1,2,3 같은 식. 커질수록 빨라짐.
 * @default 1
 *
 * @help 
 * 캐릭터의 대쉬 속도만을 변경해주는 플러그인. 숫자가 커질수록 더 빨라집니다.
 * 기본값은 1이며, 0일 경우 대쉬해도 걷는 속도가 됩니다. 
 * 스크립트와 플러그인 커맨드를 둘다 지원.
 * ※ 맵 크기보다 너무 큰 수를 넣을 경우 캐릭터가 맵에서 튀어 나가니 참고하세요.
 * 
 * --------------------------------------
 * 
 * 플러그인 커맨드(영어 대소문자 구분X) :
 * DDL_DashSpeed Default
 * 대쉬스피드 기본값
 *      ※  위 커맨드를 사용할 경우 기본값을 적용합니다.
 * 
 * DDL_DashSpeed 10
 * 대쉬스피드 10
 * 
 * --------------------------------------
 * 
 * 스크립트 호출 : 
 * DDL.DashSpeed.changeSpeed("default");
 *      ※  위 스크립트를 사용할 경우 기본값을 적용합니다.
 * 
 * DDL.DashSpeed.changeSpeed(10);
 * 
 * --------------------------------------
 * 
 * 스크립트로 현재속도 가져오기 : 
 * DDL.DashSpeed.speed
 * 
 * --------------------------------------
 * 
 * 수정 / 크레딧 표기 자유.
 * 　
 */

(function() {
	DDL.DashSpeed.parameters = PluginManager.parameters('DDL_DashSpeed');
	DDL.DashSpeed.defaultSpeed = Number(DDL.DashSpeed.parameters['기본값'] || 1);
	DDL.DashSpeed.speed = DDL.DashSpeed.defaultSpeed;
	
	var _pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_pluginCommand.call(this, command, args);
        if (command.toLowerCase() === "ddl_dashspeed") {
			if (args[0].toLowerCase() == "default")
				DDL.DashSpeed.changeSpeed("default");
			else 
				DDL.DashSpeed.changeSpeed(args[0]);
		};
        if (command === "대쉬스피드") {
			if (args[0] == "기본값")
				DDL.DashSpeed.changeSpeed("default");
			else 
				DDL.DashSpeed.changeSpeed(args[0]);
		};
	};
	
	DDL.DashSpeed.changeSpeed = function(value) {
		if(isNaN(value))
			if(String(value).toLowerCase() == "default")
			{
				DDL.DashSpeed.speed = Number(DDL.DashSpeed.defaultSpeed || 1);
				return;
			}
		DDL.DashSpeed.speed = Number(value || 1);
	}
	
	Game_CharacterBase.prototype.realMoveSpeed = function() {
		return this._moveSpeed + (this.isDashing() ? DDL.DashSpeed.speed : 0);
	};

})();
