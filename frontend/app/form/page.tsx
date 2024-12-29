import React, { Suspense } from "react";
import Base from "../components/Base";
import Form from "../components/Form";

export default function FormPage() {
  return (
    <Suspense>
      <Base>
        <Form />
      </Base>
    </Suspense>
  );
}
