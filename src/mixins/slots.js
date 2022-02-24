export const SlotsMixin = {
    methods: {
        // 整合 $slots 與 $scopedSlots, 方便使用 slot 
        slots(name="default",props) {
            const {$slots,$scopedSlots} = this;
            const scopedSlot = $scopedSlots[name]

            if(scopedSlot){
                return scopedSlot(props)
            }
            return $slots[name]
        }
    },
}