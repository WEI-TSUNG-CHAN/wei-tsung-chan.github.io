我準備好的html如下

<!doctype html>
<html>
<head>
	<title>HTML Editor - Full Version</title>
</head>
<body>
<h1>現在時間:2025-07-20 12:00:00</h1>

<table border="1" cellpadding="1" cellspacing="1" style="width:500px;">
	<tbody>
		<tr>
			<td width="20%">1台</td>
			<td><input type="button" value="獨聽" /> <input type="button" value="門清" /> <input type="button" value="莊家" /> <input type="button" value="花牌" /> <input type="button" value="風牌" /> <input type="button" value="自摸" /> <input type="button" value="門牌" /> <input type="button" value="紅中" /> <input type="button" value="白皮" /> <input type="button" value="發財" /> <input type="button" value="搶槓" /></td>
		</tr>
		<tr>
			<td>2台</td>
			<td><input type="button" value="花槓" /> <input type="button" value="三暗刻" /> <input type="button" value="平胡" /> <input type="button" value="雙花" /> <input type="button" value="槓上摸" /> <input type="button" value="全求" /></td>
		</tr>
		<tr>
			<td>3台</td>
			<td><input type="button" value="門清一摸三" /></td>
		</tr>
		<tr>
			<td>4台</td>
			<td><input type="button" value="混一色" /> <input type="button" value="碰碰胡" /> <input type="button" value="小三元" /> <input type="button" value="小四喜" /></td>
		</tr>
		<tr>
			<td>5台</td>
			<td><input type="button" value="四暗刻" /></td>
		</tr>
		<tr>
			<td>8台</td>
			<td><input type="button" value="地胡" /> <input type="button" value="清一色" /> <input type="button" value="五暗刻" /> <input type="button" value="七搶一" /> <input type="button" value="八仙過海" /> <input type="button" value="大四喜" /> <input type="button" value="大三元" /></td>
		</tr>
		<tr>
			<td>16台</td>
			<td><input type="button" value="天胡" /></td>
		</tr>
		<tr>
			<td>連莊</td>
			<td><input type="button" value="莊連1" /> <input type="button" value="莊連2" /> <input type="button" value="莊連3" /> <input type="button" value="莊連4" /> <input type="button" value="莊連5" /> <input type="button" value="莊連6" /> <input type="button" value="莊連7" /> <input type="button" value="莊連8" /> <input type="button" value="莊連9" /> <input type="button" value="莊連10" /></td>
		</tr>
	</tbody>
</table>

<p>計算結果</p>

<table border="1" cellpadding="1" cellspacing="1" style="width:500px;">
	<tbody>
		<tr>
			<td><input type="button" value="莊家 1台" /><input type="button" value="-" /></td>
		</tr>
		<tr>
			<td><input type="button" value="門清一摸三 3台" /><input type="button" value="-" /></td>
		</tr>
		<tr>
			<td><input type="button" value="花牌 1台" /><input type="button" value="-" /></td>
		</tr>
		<tr>
			<td><input type="button" value="獨聽 1台" /><input type="button" value="-" /></td>
		</tr>
		<tr>
			<td>合計: 6台</td>
		</tr>
	</tbody>
</table>

<p><input type="button" value="送出" /></p>

<p>&nbsp;</p>
</body>
</html>


我的mahjong.calculate資料如下
type,tie,flag,now
七搶一,8,0,NULL
三暗刻,2,0,NULL
五暗刻,8,0,NULL
全求,2,1,2025-07-20 12:00:00
八仙過海,8,0,NULL

幫我用node.js、javascript(請和html放在一起)、mysql寫一個網頁
1.現在時間欄:顯示當下時間
2.上方表格的台數和牌型按鈕，查詢mahjong.calculate的所有資料依台數由小到大分類代入，連莊放最後
3.下方的計算結果
3.1 當上方點擊牌型鈕，自動在這增一筆資料，並在資料的後面加一個移除鈕(-)
3.2 合計台數為所有計算結果的加總
3.3 當我按下送出鈕
3.3.1 將mahjong.calculate所有資料的flag和now欄資料還原為null
3.3.1 更新mahjong.calculate的flag欄，並在now欄押上更新時間


