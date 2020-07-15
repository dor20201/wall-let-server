import Stripe from 'stripe';
import { UserDto } from '../Users/dto/user.dto';
import { CreditCard } from './financial.model';
import { NotFoundException } from '@nestjs/common';
import { User } from '../Users/user.model';

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

  async createCreditCardToken (creditCard: CreditCard) {
    try {
    const token: Stripe.Token = await stripe.tokens.create({card: {number: creditCard.creditCardNumber, cvc: creditCard.cvc,
        // eslint-disable-next-line @typescript-eslint/camelcase
        exp_month: creditCard.valid.getUTCMonth().toString(), exp_year: creditCard.valid.getUTCFullYear().toString()}});
      return token;
    } catch (e) {
      throw new NotFoundException(e);
    }


  };

  async creatPrepaidCreditCard (user: UserDto) {
    try {
      const cardholder = await stripe.issuing.cardholders.create({
        name: user.firstName + " " + user.lastName,
        email: user.email,
        // eslint-disable-next-line @typescript-eslint/camelcase
        phone_number: user.phoneNumber,
        status: 'active',
        type: 'company',
        billing: {
          address: {
            line1: 'Eli Wiesel 2',
            city: 'Rishon LeZion',
            state: 'Israel',
            // eslint-disable-next-line @typescript-eslint/camelcase
            postal_code: '7579806',
            country: 'Israel',
          },
        },
      });

      const card: Stripe.Issuing.Card = await stripe.issuing.cards.create(
        {
          cardholder: 'ich_1GzwW22eZvKYlo2CUI57MDPG',
          currency: 'usd',
          type: 'virtual',
          // eslint-disable-next-line @typescript-eslint/camelcase
          spending_controls: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            spending_limits:[{amount: 0, interval: 'all_time'}]
          }
        }
      );

      return card && card.id;
    } catch (e) {
      throw new NotFoundException(e);
    }
  };

  async loadPrepaidCard (token: Stripe.Token, price: number, prepaidCardId: string) {
    const charge = await stripe.charges.create({
      amount: price * 100,
      currency: 'usd',
      source: token.id,
    });

    // Move after this will be a real stripe account.
    return charge;

    if (charge) {
      const card = await stripe.issuing.cards.retrieve(
        prepaidCardId
      );

      card.spending_controls.spending_limits[0].amount += charge.amount;

      const updatedCard = await stripe.issuing.cards.update(
        prepaidCardId,
        // eslint-disable-next-line @typescript-eslint/camelcase
        {spending_controls: card.spending_controls});

      return charge;
    }
  }

}

export const stripeData = new StripeData();


