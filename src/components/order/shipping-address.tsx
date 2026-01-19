import { Cart } from "@/lib/types/basket";
import { Input } from "../common/input";

export const ShippingAddress = ({
  cart,
  checked,
  onChange,
}: {
  cart: Cart;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <div className='sidebar-search-form shipping_address'>
      <div className='grid grid-cols-2 gap-4'>
        <Input
          label='First name'
          name='shipping_address.first_name'
          autoComplete='given-name'
          placeholder='First name'
          defaultValue={cart.shippingAddress?.firstName}
          required
        />
        <Input
          label='Last name'
          name='shipping_address.last_name'
          autoComplete='family-name'
          placeholder='Last name'
          defaultValue={cart.shippingAddress?.lastName}
          required
        />
        <Input
          label='Address'
          name='shipping_address.address_1'
          autoComplete='address-line1'
          placeholder='Address'
          defaultValue={cart.shippingAddress?.address1}
          required
        />
        <Input
          label='Company'
          name='shipping_address.company'
          autoComplete='organization'
          placeholder='Company'
          defaultValue={cart.shippingAddress?.company}
        />
        <Input
          label='Postal code'
          name='shipping_address.postal_code'
          autoComplete='postal-code'
          placeholder='Postal code'
          defaultValue={cart.shippingAddress?.postalCode}
          required
        />
        <Input
          label='City'
          name='shipping_address.city'
          autoComplete='address-level2'
          placeholder='City'
          defaultValue={cart.shippingAddress?.city}
          required
        />
        <Input
          label='Country'
          name='shipping_address.country_code'
          autoComplete='country'
          placeholder='Country'
          defaultValue={cart.shippingAddress?.countryCode}
          required
        />
        <Input
          label='State / Province'
          name='shipping_address.province'
          autoComplete='address-level1'
          placeholder='State / Province'
          defaultValue={cart.shippingAddress?.province}
        />
      </div>

      <div className='form-check my-8! p-0 '>
        <label className='form-check-label flex! items-center'>
          <input
            className='form-check-input bill_checkbox'
            type='checkbox'
            name='same_as_billing'
            checked={checked}
            onChange={onChange}
          />
          Billing address same as shipping address
        </label>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Input
          label='Email'
          name='email'
          type='email'
          autoComplete='email'
          placeholder='Email'
          defaultValue={cart.email}
          required
        />
        <Input
          label='Phone'
          name='shipping_address.phone'
          autoComplete='tel'
          placeholder='Phone'
          defaultValue={cart.shippingAddress?.phone}
          required
        />
      </div>
    </div>
  );
};
