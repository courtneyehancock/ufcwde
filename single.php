<?php get_header(); ?>

<div class="main-content">
<div class="container internal-div">
  <div class="row">
    <div class="col-lg-3">
    </div>
    <div class="col-lg-9">
<?php
  if(have_posts()){
    while(have_posts()){
      the_post(); ?>
    <!--  <div class="post-feature">
        <?php the_post_thumbnail(); ?>
      </div>-->
      <h2 class="post-title"><?php the_title(); ?></h2>
      <!--<p><?php echo "Published: " . get_the_date(); ?></p>-->
      <!--<p><?php echo "This post is written by : " . get_the_author(); ?></p>-->
        <?php the_content(); ?>

      <div class="pagination-single">
        <?php previous_post_link('%link', 'Previous Post >>');?>
      </div>

      <div class="pagination-single">
        <?php next_post_link('%link', 'Next Post >>');?>
      </div>

    </div>
  </div>
      <?php
    }
  }
?>

</div>
</div>

<?php get_footer(); ?>
