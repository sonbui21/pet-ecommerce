import { Cart } from "@/lib/types/basket";
import { Input } from "../common/input";

export const BillingAddress = ({ cart }: { cart: Cart }) => {
  return (
    <div className='sidebar-search-form shipping_address'>
      <div className='grid grid-cols-2 gap-4'>
        <Input
          label='First name'
          name='billing_address.first_name'
          placeholder='First name'
          defaultValue={cart.billingAddress?.firstName}
          required
        />
        <Input
          label='Last name'
          name='billing_address.last_name'
          placeholder='Last name'
          defaultValue={cart.billingAddress?.lastName}
          required
        />
        <Input
          label='Address'
          name='billing_address.address_1'
          placeholder='Address'
          defaultValue={cart.billingAddress?.address1}
          required
        />
        <Input
          label='Company'
          name='billing_address.company'
          placeholder='Company'
          defaultValue={cart.billingAddress?.company}
        />
        <Input
          label='Postal code'
          name='billing_address.postal_code'
          placeholder='Postal code'
          defaultValue={cart.billingAddress?.postalCode}
          required
        />
        <Input
          label='City'
          name='billing_address.city'
          placeholder='City'
          defaultValue={cart.billingAddress?.city}
          required
        />
        <Input
          label='Country'
          name='billing_address.country_code'
          placeholder='Country'
          defaultValue={cart.billingAddress?.countryCode}
          required
        />
        <Input
          label='State / Province'
          name='billing_address.province'
          placeholder='State / Province'
          defaultValue={cart.billingAddress?.province}
        />
      </div>
    </div>
  );
};
