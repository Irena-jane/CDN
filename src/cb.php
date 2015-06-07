<?php
 $fp = fopen('../cb.xml', 'w');
 $ch = curl_init();
curl_setopt($ch, CURLOPT_URL,
      'http://www.cbr.ru/scripts/XML_daily.asp');
curl_setopt($ch, CURLOPT_FILE, $fp);
curl_exec($ch);
fclose($fp);
curl_close ($ch);
?>