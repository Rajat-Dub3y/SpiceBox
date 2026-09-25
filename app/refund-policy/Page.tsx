import type { Metadata } from 'next';
import React from 'react';
import {RefundPolicyClient} from '../../components/sections/RefundPolicyClient';

export const metadata: Metadata = {
  title: 'Refund & Returns Policy | The Eco Shop',
  description: 'Learn about our eco-friendly return window, 3-step return process, and instant refund timeline at The Eco Shop.',
};

export default function RefundPolicyPage() {
  return <RefundPolicyClient />;
}