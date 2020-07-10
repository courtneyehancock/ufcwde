<?php /* Template Name: Search Page */
get_header();
?>
<div class="main-content pt-5">
  <div class="container pt-5">
    <div class="row">
      <div class="col-lg-12">
        <?php if(have_posts()){?>
                <h1><?php printf(__('SEARCH RESULTS FOR : %s'), '<span>' . get_search_query() . '</span>');?></h1>
                <hr>
                <?php while(have_posts()){
                  the_post(); ?>
                  <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                  <?php the_excerpt();
                }
              }else{?>
                <h1>Nothing was found</h1>
                <p>Try another search term.</p>
                <?php
                get_search_form();
              }
        ?>
      </div>
    </div>
  </div>
</div>
<?php get_footer(); ?>
