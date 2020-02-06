<?php

foreach ($comments as $comment): ?>
  <div class="comments"><?php
    echo '<div class="comment-author">' . get_comment_author_link() . '</div>';
    echo '<div class="comment-date">' . get_comment_date() . '</div>';
    echo '<div class="comment-text">' . get_comment_text() . '</div>';?>
  </div><?php
endforeach;


comment_form();


?>
