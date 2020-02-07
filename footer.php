<footer>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4">
        <!--Logo/text widget-->
        <?php dynamic_sidebar('left-footer'); ?>
      </div>
      <div class="col-lg-2">
        <!--Middle Footer-->
        <?php dynamic_sidebar('middle-footer'); ?>
      </div>
      <div class="col-lg-3">
        <!--Middle Right Footer-->
        <?php dynamic_sidebar('middle-right-footer'); ?>
      </div>
      <div class="col-lg-3">
        <!--right footer-->
        <?php dynamic_sidebar('right-footer'); ?>
      </div>
    </div>

  </div>
</footer>

<?php wp_footer(); ?>

</body>
</html>
