<footer>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <!--Logo/text widget-->
        <?php dynamic_sidebar('left-footer'); ?>
      </div>

      <div class="col-md-2">
        <!--Middle Left Footer-->
        <?php dynamic_sidebar('middle-left-footer'); ?>
      </div>
      <div class="col-md-2">
        <!--Middle Footer-->
        <?php dynamic_sidebar('middle-footer'); ?>
      </div>
      <div class="col-md-2">
        <!--Middle Right Footer-->
        <?php dynamic_sidebar('middle-right-footer'); ?>
      </div>
      <div class="col-md-3">
        <!--right footer-->
        <?php dynamic_sidebar('right-footer'); ?>
      </div>
    </div>

  </div>
</footer>

<?php wp_footer(); ?>

</body>
</html>
