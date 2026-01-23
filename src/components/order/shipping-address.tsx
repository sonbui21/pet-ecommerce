import { Cart } from "@/lib/types/cart";
import { Input } from "../common/input";

export const ShippingAddress = ({ cart, email }: { cart: Cart; email?: string }) => {
  return (
    <div className='sidebar-search-form shipping_address flex flex-col gap-4'>
      <div className='grid grid-cols-2 gap-4'>
        <Input
          label='Name'
          name='shipping_address.name'
          placeholder=' '
          defaultValue={cart.shippingAddress?.name}
          required
        />

        <Input
          label='Phone'
          name='shipping_address.phone'
          placeholder=' '
          defaultValue={cart.shippingAddress?.phone}
          required
        />

        <Input
          label='Street'
          name='shipping_address.street'
          placeholder=' '
          defaultValue={cart.shippingAddress?.street}
          required
        />

        <Input
          label='City'
          name='shipping_address.city'
          placeholder=' '
          defaultValue={cart.shippingAddress?.city}
          required
        />

        <Input
          label='State'
          name='shipping_address.state'
          placeholder=' '
          defaultValue={cart.shippingAddress?.state}
          required
        />

        <Input
          label='Country'
          name='shipping_address.country'
          placeholder=' '
          defaultValue={cart.shippingAddress?.country}
          required
        />
        <Input
          label='Zip Code'
          name='shipping_address.zip_code'
          placeholder=' '
          defaultValue={cart.shippingAddress?.zipCode}
          required
        />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Input label='Email' name='email' type='email' placeholder='Email' defaultValue={email} required readOnly />
      </div>
    </div>
  );
};
