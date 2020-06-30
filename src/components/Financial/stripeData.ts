import Stripe from 'stripe';
import { UserDto } from '../Users/dto/user.dto';

const secretKey = "sk_test_NM7X3ToqdS8h968duDsV4XxL00WdLdzrko";

const stripe = new Stripe(secretKey, {
  apiVersion: '2020-03-02',
});

class StripeData {
  async createCustomer (user: UserDto) {
    const params: Stripe.CustomerCreateParams = {
      email: user.email
    };

    const customer: Stripe.Customer = await stripe.customers.create(params);

    return customer.id;
  };


}

export const stripeData = new StripeData();


