<?php

class Potato_PhoneMask_Block_Mask extends Mage_Core_Block_Template
{
    public function canShow()
    {
        $isEnabled = $this->helper('po_phonemask/config')->isEnabled();
        return $isEnabled && $this->getMask();
    }

    public function getMask()
    {
        return $this->helper('po_phonemask/config')->getPhoneMask();
    }
}