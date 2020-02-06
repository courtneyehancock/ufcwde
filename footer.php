<footer>
  <div class="container">
    <div class="row">
      <div class="col-md-5">
        <!--Logo/text widget-->
        <?php dynamic_sidebar('left-footer'); ?>
      </div>

      <div class="col-md-1">
        <!--Middle Left Space-->
        <?php dynamic_sidebar('middle-left-footer'); ?>
      </div>

      <div class="col-md-3">
        <!--Menu Title Widget-->
        <?php dynamic_sidebar('menu-title-footer'); ?>
        <!-- Navigation -->
        <?php wp_nav_menu(array(
          'theme_location' => 'footer-menu',
          'container-class' => 'menu-footer'
          ));
        ?>
      </div>

      <div class="col-md-3">
        <!--Contact Widget-->
        <?php dynamic_sidebar('right-footer'); ?>
      </div>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>

</body>
</html>
