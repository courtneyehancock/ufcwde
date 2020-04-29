<footer>
  <div class="container">
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

    <hr />
  </div>
  <div class="container-fluid final-footer">
    <div class="row">
      <div class="col-md-6">
        <p class="text-center font-italic"> © 2020 University of Florida Career and Workforce Dual Enrollment</p>
      </div>
      <div class="col-md-3">
        <img alt="PWD Logo" src="http://apps.aa.ufl.edu/PDContent/website/pwd/Office_ProfessionalAndWorkforceDev-white.png"/>
      </div>
      <div class="col-md-3">
        <img alt="UF Logo" src="http://apps.aa.ufl.edu/PDContent/website/UF_Signature_white.png"/>
      </div>
  </div>
</footer>

<?php wp_footer(); ?>

</body>
</html>
