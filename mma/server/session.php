<?php
    class Session { 
        static function _init(){ 
            ini_set('session.auto_start', 0); 
        } 
         
        static function start() { 
            session_start(); 
        } 
        public static function set($name,$value,$time){ 
            if(empty($time)){ 
                $time = 1800; //默认值  
            } 
            $_SESSION[$name] = $value; 
            $_SESSION[$name.'_Expires'] = time() + $time; 
        } 
        public static function get($name){ 
            if(isset($_SESSION[$name.'_Expires']) && $_SESSION[$name.'_Expires']>time()){ 
                return $_SESSION[$name]; 
            }else{ 
                Session::clear($name); 
                return null; 
            } 
        } 
          
        static function setDomain($sessionDomain = null) { 
            $return = ini_get('session.cookie_domain'); 
            if(!empty($sessionDomain)) { 
                ini_set('session.cookie_domain', $sessionDomain);//跨域访问Session  
            } 
            return $return; 
        } 
        static function clear($name){ 
            unset($_SESSION[$name]); 
            unset($_SESSION[$name.'_Expires']); 
        } 
        static function destroy(){ 
            unset($_SESSION); 
            session_destroy(); 
        } 
        static function sessionid($id=null){ 
            return session_id($id); 
        } 
      
    }
?>
