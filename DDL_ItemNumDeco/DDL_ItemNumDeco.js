//=============================================================================
// DDL_ItemNumDeco.js
//=============================================================================

var Imported = Imported || {};
Imported.DDL_ItemNumDeco = true;

var DDL = DDL || {};
DDL.ItemNumDeco = {};

/*:
 * @plugindesc 아이템 개수 표시 문자를 꾸며주는 스크립트
 * v1.0.0
 * @author ㅓㅇ, DDL (d-dl.tistory.com)
 *
 * @param 아이템 개수 표시 여부
 * @type select
 * @option 늘 표시함
 * @value 0
 * @option 개수가 1개일 경우엔 표시하지 않음
 * @value 1
 * @option 아예 표시하지 않음
 * @value 2
 * @desc 아이템 개수를 언제 표시할지 지정할 수 있습니다.
 * 기본값 : 늘 표시함(0)
 * @default 0
 *
 * @param 아이템 선택 시 개수 표시 여부
 * @type boolean
 * @on 표시함
 * @off 표시하지 않음
 * @desc 아이템 선택 창을 띄울 시 아이템 개수를 표시할지 여부
 * @default true
 *
 * @param 글자 크기
 * @type number
 * @min 0
 * @desc px 단위. 0으로 지정할 경우 기본 값을 가져옵니다.
 * 기본값: 0
 * @default 0
 *
 * @param 글자색 번호
 * @type number
 * @min 0
 * @desc 텍스트 표시 윈도우에서 사용되는 컬러 색상(\c[숫자])을 적용합니다.
 * 기본값: 7(회색)
 * @default 7
 *
 * @param 위치 오프셋 x
 * @desc x 방향으로 오프셋을 수정합니다.
 * 기본값 : 0
 * @default 0
 *
 * @param 위치 오프셋 y
 * @desc y 방향으로 오프셋을 수정합니다.
 * 기본값 : 0
 * @default 0
 *
 * @param 여백 텍스트
 * @desc "아이템 이름 : 10" 같은 식으로 표시될 때 " : 10"에 
 * 얼마나 여백을 줄 것인가를 텍스트로 설정할 수 있습니다.
 * @default 000
 *
 * @param 숫자 부분 여백 텍스트
 * @desc "아이템 이름 : 10" 같은 식으로 표시될 때 "10"에 
 * 얼마나 여백을 줄 것인가를 텍스트로 설정할 수 있습니다.
 * @default 00
 *
 * @param 아이템 개수 표시 앞에 올 문자
 * @desc "아이템 이름 : 10" 같은 식으로 표시될 때 ':' 부분에 들어갈 문자입니다.
 * @default x
 *
 * @param 아이템 개수 표시 뒤에 올 문자
 * @desc "아이템 이름 : 10" 같은 식으로 표시될 때 '10' 뒤에 들어갈 문자입니다.(ex. 10개)
 * 기본값: 없음
 * @default 
 *
 * @help 
 * 기본 인벤토리, 아이템 선택 처리 시 아이템 개수를 표시하는 문자를 
 * 간단하게 꾸며줍니다.
 * 특별히 복잡한 기능은 없어 따로 가이드를 작성하진 않았습니다.
 * 
 * 다만, '여백 텍스트'의 부분에 관해서만 짧게 설명하자면, 
 * 만약 텍스트가 '000'일 경우 폰트로 '000'을 작성할 때만큼의 
 * 가로 길이를 받아와 여백을 만들어줍니다.
 * '숫자 부분 여백 텍스트' 역시 '00'만큼의 공간의 여백을 넣어줍니다.
 * 타 플러그인으로 아이템 최대 소지 개수를 2자리 수 이상으로 
 * 수정했을 경우 간편히 사용될 수 있습니다.
 * 
 * 수정 / 크레딧 표기 자유.
 * 
 */

(function() {
	DDL.ItemNumDeco.parameters = PluginManager.parameters('DDL_ItemNumDeco');
	// DDL.ItemNumDeco.pluginCommand = Game_Interpreter.prototype.pluginCommand;
	//DDL.ItemNumDeco.params = {};
	
	DDL.ItemNumDeco.textHidden = Number(DDL.ItemNumDeco.parameters['아이템 개수 표시 여부'] || 0);
	DDL.ItemNumDeco.textHidden_EventItem = eval(String(DDL.ItemNumDeco.parameters['아이템 선택 시 개수 표시 여부'] || 'true'));
	DDL.ItemNumDeco.fontSize = Number(DDL.ItemNumDeco.parameters['글자 크기'] || 0);
	DDL.ItemNumDeco.fontColNum = Number(DDL.ItemNumDeco.parameters['글자색 번호'] || 0);
	DDL.ItemNumDeco.offsetX = Number(DDL.ItemNumDeco.parameters['위치 오프셋 x'] || 0);
	DDL.ItemNumDeco.offsetY = Number(DDL.ItemNumDeco.parameters['위치 오프셋 y'] || 0);
	DDL.ItemNumDeco.beforeNameStr = String(DDL.ItemNumDeco.parameters['아이템 개수 표시 앞에 올 문자'] || ':');
	DDL.ItemNumDeco.afterNameStr = String(DDL.ItemNumDeco.parameters['아이템 개수 표시 뒤에 올 문자'] || '');
	DDL.ItemNumDeco.emptyText = String(DDL.ItemNumDeco.parameters['여백 텍스트'] || '000');
	DDL.ItemNumDeco.emptyNumText = String(DDL.ItemNumDeco.parameters['숫자 부분 여백 텍스트'] || '00');
	
	console.log(DDL.ItemNumDeco);
	
	// 아이템 텍스트 여백
	Window_ItemList.prototype.numberWidth = function() {
		return this.textWidth(DDL.ItemNumDeco.emptyText);
	};

	// 아이템 넘버 드로우
	var _ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
	Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
		if ( DDL.ItemNumDeco.textHidden == 2 ) return;
		if ( DDL.ItemNumDeco.textHidden >= 1 && $gameParty._items[item.id]  <= 1) return;
		
		var beforeFS = this.contents.fontSize;
		if( DDL.ItemNumDeco.fontSize != 0 ) 
			this.contents.fontSize = DDL.ItemNumDeco.fontSize;
		if( DDL.ItemNumDeco.fontColNum != 0 )
			this.changeTextColor(this.textColor(DDL.ItemNumDeco.fontColNum));
		
		// _ItemList_drawItemNumber.call(this, item, x, y, width); <- 이것을 복사 붙여넣기 한 것 ↓
		if (this.needsNumber()) {
			x += DDL.ItemNumDeco.offsetX;
			y += DDL.ItemNumDeco.offsetY;
			this.drawText(DDL.ItemNumDeco.beforeNameStr, x, y, width
			- this.textWidth(DDL.ItemNumDeco.emptyNumText), 'right');
			this.drawText($gameParty.numItems(item) + DDL.ItemNumDeco.afterNameStr, x, y, width, 'right');
		}
		
		this.resetTextColor();
		this.contents.fontSize = beforeFS;
	};
	
	// 아이템 선택 처리
	var _EventItem_drawItemNumber = Window_EventItem.prototype.drawItemNumber;
	Window_EventItem.prototype.drawItemNumber = function(item, x, y, width) {
		if(DDL.ItemNumDeco.textHidden_EventItem)
			_EventItem_drawItemNumber.call(this, item, x, y, width);
	};

})();
