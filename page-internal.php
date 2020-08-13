<?php /*Template Name: Internal Page Template*/ ?>

<?php get_header(); ?>

<div class="main-content">

  <?php
    if(have_posts()){
      while(have_posts()){
        the_post();?>
        <?php the_content();
      }
    }
  ?>

</div>

<script type="text/javascript">
        $(document).ready(function () {;
            getXMSConferencesSSP(0, 3, 'active');
            getXMSConferences(3, 3, 'active');
        });
	</script>

<?php get_footer(); ?>
