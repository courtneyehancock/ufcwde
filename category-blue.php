<?php
/**
* A Simple Category Template
*/

get_header(); ?>
<div class="main-content">
<div class="container-fluid internal-div">
<?php
// Check if there are any posts to display
if ( have_posts() ) : ?>


<?php
// Since this template will only be used for Design category
// we can add category title and description manually.
// or even add images or change the layout
?>

<h1 class="text-uppercase text-right">Blue Articles</h1>
<hr>
<div>
  <h4 class="text-center">Articles and tutorials about Blue things and Smurfs.</h4>
</div>

<div class="row align-items-start internal-div justify-content-center">
<?php

  // The Loop
  while ( have_posts() ) : the_post(); ?>

  <div class="col-lg-3 posts">
    <?php the_post_thumbnail('medium'); ?>
    <h2 class="post-title"><a class="aa" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    <?php the_excerpt(); ?>
    <?php
      $archive_year = get_the_time('Y');
      $archive_month = get_the_time('m');
      $archive_day = get_the_time('d');
    ?>
    <div class="post-info">
    <!--  <p class="font-italic">Published: <a href="<?php echo get_day_link($archive_year, $archive_month, $archive_day); ?>"><?php echo get_the_date(); ?></a></p>-->
      <p class="category-label font-italic">Category: <?php the_category(); ?></p>
    </div>
  </div>

<?php endwhile; // End Loop

else: ?>
<p>Sorry, no posts matched your criteria.</p>
<?php endif; ?>
</div>
</div>
</div>
<?php get_footer(); ?>
