<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php bloginfo('name'); ?></title>
  <?php wp_head(); ?>
</head>

<body <?php body_class();?>>

<header>
  <div class="container-fluid align-content-center">
    <div class="row main-nav">
      <div class="col-md-4" id="site-logo">
        <!--If/else for Logo and Site Title-->
        <?php if(get_header_image() == '') { ?>
          <h1><a href="<?php echo home_url('/'); ?>"><?php bloginfo('name'); ?></a></h1>
          <?php
        }else{?>
          <a href="<?php echo home_url('/'); ?>"><img class="align-middle iwl-logo" src="<?php header_image(); ?>" height="<?php echo get_custom_header()->height; ?>" width="<?php echo get_custom_header()->width; ?>" alt="Logo" /></a>
          <?php
        }
        ?>
      </div>
      <div class="col-md-8 p-3" id="site-nav">
        <!--Navigation-->
        <?php wp_nav_menu(array(
          'theme_location' => 'header-menu',
          'container-class' => 'menu-header'
          ));
        ?>
      </div>
    </div>
  </div>
</header>
