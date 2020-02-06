<?php get_header(); ?>

<div class=container>
<?php
  if(have_posts()){
    while(have_posts()){
      the_post(); ?>
      <div class="post-feature">
        <?php the_post_thumbnail(); ?>
      </div>
      <h2 class="post-title"><?php the_title(); ?></h2>
      <p><?php echo "Published: " . get_the_date(); ?></p>
      <?php the_content(); ?>
      <p><?php echo "This post is written by : " . get_the_author(); ?></p>

      <div class="pagination-single">
        <?php previous_post_link('%link', 'Previous Post >>');?>
      </div>

      <div class="pagination-single">
        <?php next_post_link('%link', 'Next Post >>');?>
      </div>

    </div>
      <?php
    }
  }
  if (comments_open() || get_comments_number()):
    comments_template();
  endif;
?>
</div>

<?php get_footer(); ?>
