<footer>
  <div class="container">
    <div class="row">
      <div class="col-lg-5 pl-5">
        <!--Logo/text widget-->
        <?php dynamic_sidebar('left-footer'); ?>
      </div>
      <div class="col-lg-1 pl-5">
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
