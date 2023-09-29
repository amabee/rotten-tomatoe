<?php
$movie = $_REQUEST["film"];
$moviePath = ".//moviefiles/$movie";
list($title, $year, $overall) = file("$moviePath/info.txt", FILE_IGNORE_NEW_LINES);
$sidebarInfo = file("$moviePath/overview.txt", FILE_IGNORE_NEW_LINES);
$reviewFiles = glob("$moviePath/review*.txt");
$reviewCount = count($reviewFiles);


function getSidebar()
{
    global $sidebarInfo;
    $sidebar = "";
    foreach ($sidebarInfo as $line) {
        list($section, $info) = explode(":", $line);
        $sidebar .= "<dt>$section</dt><dd>$info</dd>";
    }
    return $sidebar;
}


function printReviews()
{
    global $reviewFiles;
    global $reviewCount;
    print("<div class='reviews-column'>");
    for ($i = 0; $i < $reviewCount; $i++) {
        list($quote, $status, $name, $company) = file($reviewFiles[$i], FILE_IGNORE_NEW_LINES);
        $img = getReviewImg($status);
        if ($i == floor(($reviewCount + 1) / 2)) {
            print("</div><div class='reviews-column'>");
        }
        print("
					<p>
						$img
						<q>$quote</q>
					</p>
					<p>
						<img src='critic.gif' alt='Critic' />
						$name<br />
						<em>$company</em>
					</p>
				");
    }
    print("</div>");
}


function getReviewImg($status)
{
    if ($status == "ROTTEN") {
        return "<img src='rotten.gif' alt='Rotten' />";
    } else {
        return "<img src='fresh.gif' alt='Fresh' />";
    }
}

function printReviewsHeader()
{
    global $overall;
    if ($overall < 60) {
        return "<img src='rottenbig.png' alt='Rotten' />$overall%";
    } else {
        return "<img src='freshbig.png' alt='Fresh' />$overall%";
    }
}
