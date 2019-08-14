<?php

class Potato_PhoneMask_Helper_Config extends Mage_Core_Helper_Abstract
{
    const GENERAL_IS_ENABLED = 'po_phonemask/general/is_enabled';
    const GENERAL_MASK = 'po_phonemask/general/mask';

    /**
     * @param null|string|bool|int|Mage_Core_Model_Store $store
     *
     * @return bool
     */
    public static function isEnabled($store = null)
    {
        return (bool)Mage::getStoreConfig(self::GENERAL_IS_ENABLED, $store);
    }

    /**
     * @param null|string|bool|int|Mage_Core_Model_Store $store
     *
     * @return string
     */
    public static function getPhoneMask($store = null)
    {
        return (string)trim(Mage::getStoreConfig(self::GENERAL_MASK, $store));
    }
}