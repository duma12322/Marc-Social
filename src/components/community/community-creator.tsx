import { useForm } from "react-hook-form";
import { useAddCommunity } from "src/hooks/mutation";
import { useCategoryQuery } from "src/hooks/query";
import FormInput from "@/components/form/form-input";
import { toast } from "react-toastify";
import FormSelect from "@/components/form/form-select";
import Button from "../common/button";
import FormTextarea from "../form/form-textarea";
import LetterCounter from "../common/letter-counter";

interface FormInputType {
  name: string;
  category: string;
  description: string;
}

interface CommunityCreatorProps {
  handleCloseCreator: () => void;
}

const CommunityCreator = ({ handleCloseCreator }: CommunityCreatorProps) => {
  const onSuccessCb = () => {
    handleCloseCreator();
    toast("Comunidad creada", { type: "success" });
  };

  const addCommunity = useAddCommunity(onSuccessCb);

  const { data: categories, isSuccess } = useCategoryQuery();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormInputType>({
    defaultValues: {
      name: "",
      category: "",
      description: ""
    }
  });

  const onSubmit = (data: FormInputType) => {
    addCommunity({
      name: data.name,
      categoryId: data.category,
      description: data.description
    });
  };

  if (!isSuccess) return <>Cargando</>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 pt-2"
    >
      <FormInput
        label="nombre"
        name="name"
        error={errors.name}
        rules={{
          required: {
            value: true,
            message: "El nombre es requerido"
          },
          minLength: {
            message: "El nombre debe tener al menos 3 caracteres.",
            value: 3
          },
          maxLength: {
            message: "El nombre puede tener hasta 30 caracteres",
            value: 30
          }
        }}
        register={register}
      />
      <div className="relative">
        <FormTextarea
          label="descripcion"
          name="description"
          error={errors.description}
          register={register}
          rules={{
            maxLength: {
              message: "La descripción puede tener hasta 300 caracteres.",
              value: 300
            }
          }}
        />
        <LetterCounter
          currentLength={watch("description").length}
          maxLength={300}
        />
      </div>
      <FormSelect
        label="categoria"
        error={errors.category}
        name="category"
        register={register}
        options={categories}
        watch={watch}
        rules={{
          required: {
            value: true,
            message: "La Categoria es requerida"
          }
        }}
      />
      <Button className="mt-3">Subir</Button>
    </form>
  );
};

export default CommunityCreator;
