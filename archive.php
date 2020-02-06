<?php /* Template Name: Archive Page */
get_header();
?>
<div class="container">
  <div class="row">
    <div class="twelve columns">
      <h2><?php
        if(is_category()){
          single_cat_title();
        }elseif(is_tag()){
          single_tag_title();
        }elseif(is_day()){
          echo "Daily Archives: " . get_the_date();
        }elseif(is_month()){
          echo "Monthly Archives: " . get_the_date('F Y');
        }elseif(is_year()){
          echo "Yearly Archives: " . get_the_date('Y');
        }else{
          echo "Archives";
        }
       ?>
      </h2>
      <?php if(have_posts()){
              while(have_posts()){
                the_post(); ?>
                <div class="twelve columns">
                  <h3><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h3>
                  <p>Published: <?php the_time('F j, Y'); ?></p>
                  <p><?php the_excerpt(); ?></p>
                  <a href="<?php the_permalink() ?>">Read More</a>
                </div>
              }
            }
      ?>
    </div>
  </div>
</div>

<?php get_footer(); ?>
