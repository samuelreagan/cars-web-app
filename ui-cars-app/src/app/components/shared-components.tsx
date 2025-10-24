import { Button, Skeleton, TextField, Typography } from "@mui/material";

import { Car } from "../types/car";

export function CarForm({
  formType,
  loading = false,
  onSubmit,
  onCancel,
  onDelete,
  defaultData
}: {
  formType: 'update' | 'add';
  loading?: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onDelete?: () => void;
  defaultData?: Car | null;
}) {
  const formHeader = formType === 'add' ? 'Add a New Car' : 'Update Car Details';
  const submitButtonLabel = formType === 'add' ? 'Add Car' : 'Update Car';
  const deleteButton = formType === 'update'
    ? <Button size="small" color='error' variant='contained' sx={{ marginRight: 2 }} onClick={onDelete}>Delete</Button>
    : null;
  const hasData = !!defaultData;

  return (
    <form onSubmit={onSubmit}>
      <Typography sx={{ textAlign: 'center', marginBottom: 2 }}
                  variant="h4"
                  component="h2"
      >
      {formHeader}
      </Typography>
      { loading
        ? <SkeletonForm></SkeletonForm>
        : <div>
            <TextField id="outlined-basic" label={hasData ? '' : 'Make'} name="make" variant="outlined" required fullWidth={true} sx={{ marginBottom: 2 }} defaultValue={defaultData?.make ?? ''}/>
            <TextField id="outlined-basic" label={hasData ? '' : 'Model'} name="model" variant="outlined" required fullWidth={true} sx={{ marginBottom: 2 }} defaultValue={defaultData?.model ?? ''}/>
            <TextField id="outlined-basic" label={hasData ? '' : 'Year'} name="year" variant="outlined" required fullWidth={true} sx={{ marginBottom: 2 }} defaultValue={defaultData?.year ?? ''}/>
            <TextField id="outlined-basic" label={hasData ? '' : 'Features'} name="features" variant="outlined" fullWidth={true} sx={{ marginBottom: 2 }} defaultValue={defaultData ? defaultData.features.join(', ') : ''}/>
            <Button size="small" variant='contained' sx={{ background: "var(--eko-purple)", marginRight: 2 }} type='submit'>{submitButtonLabel}</Button>
            {deleteButton}
            <Button size="small" variant='contained' sx={{ background: "var(--foreground)", marginRight: 2 }} onClick={onCancel}>Cancel</Button>
          </div>
      }
    </form>
  )
}

export function SkeletonForm() {
  return (
    <article>
      <Skeleton variant="rectangular" height={50} sx={{ marginBottom: 2 }} />
      <Skeleton variant="rectangular" height={50} sx={{ marginBottom: 2 }} />
      <Skeleton variant="rectangular" height={50} sx={{ marginBottom: 2 }} />
      <Skeleton variant="rectangular" height={50} sx={{ marginBottom: 2 }} />
      <Skeleton variant="rectangular" height={50} sx={{ marginBottom: 2 }} />
    </article>
  );
}