<?php

namespace PostNest\Admin;

/**
 * Ajax class
 * 
 * This class is used to handle AJAX requests.
 * @package PostNest\Admin
 * @author Mojahid Islam
 * @since 1.0.0
 */
class Ajax
{
    public function __construct()
    {
        add_action('wp_ajax_post_nest_save_settings', [$this, 'save_settings']);
    }
}
