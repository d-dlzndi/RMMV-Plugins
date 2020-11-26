//=============================================================================
// DDL_EditEscapeCharacter.js
//=============================================================================

var Imported = Imported || {};
Imported.DDL_EditEscapeCharacter = true;

var DDL = DDL || {};
DDL.EditEscapeCharacter = {};

/*:
 * @plugindesc 텍스트 이스케이프 시간 변경
 * v1.0.0
 * @author ㅓㅇ, DDL (d-dl.tistory.com)
 *
 * @param 배속
 * @desc 1,2,3 같은 식. 커질수록 빨라짐.
 * @default 1
 *
 * @help 
 * \. \|의 텍스트 멈춤 코드를 배속하는 플러그인.
 * 배속값은 소수점 아래 2자리까지만 저장함.
 * 잘 사용되지 않는 기능이라 타 플러그인과 겹칠 일은 거의 없겠으나
 * 가능하면 텍스트 윈도우와 관련된 타 플러그인보다 하단에 둘 것을 권장.
 * 
 * 현재속도 가져오기 : 
 * DDL.EditEscapeCharacter.speed
 * 스크립트 호출 : 
 * DDL.EditEscapeCharacter.ChangeSpeed(value)
 * DDL.EditEscapeCharacter.changeSpeed(value)
 * 
 * 플러그인 커맨드 :
 * DDL_EscapeCharaSpeed value
 * DDL_EscapeCharaSpeed 10
 */

(function() {
	DDL.EditEscapeCharacter.parameters = PluginManager.parameters('DDL_EditEscapeCharacter');
	DDL.EditEscapeCharacter.speed = Number(DDL.EditEscapeCharacter.parameters['배속'] || 1);
	
	var _pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_pluginCommand.call(this, command, args);
        if (command.toLowerCase() === "ddl_escapecharaspeed") {
			DDL.EditEscapeCharacter.ChangeSpeed(Number(args[0]));
		};
	};
	
	DDL.EditEscapeCharacter.changeSpeed = function(value) {
		DDL.EditEscapeCharacter.ChangeSpeed(value);
	}
	
	DDL.EditEscapeCharacter.ChangeSpeed = function(value) {
		DDL.EditEscapeCharacter.speed = Math.round(Number(value) * 100) / 100;
	}
	
	var _processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
	Window_Message.prototype.processEscapeCharacter = function(code, textState) {
		switch (code) {
			case '.':
				this.startWait(Math.round(15 / DDL.EditEscapeCharacter.speed));
				break;
			case '|':
				this.startWait(Math.round(60 / DDL.EditEscapeCharacter.speed));
				break;
		  default:
				_processEscapeCharacter.call(this, code, textState);
				break;
		}
	};

})();
