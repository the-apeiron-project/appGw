export interface IOption {
  value: any | null;
  text?: string | null;
  langKey?: string | null;
  disabled?: boolean | null;
  icon?: string | null;
}

export class Option implements IOption {
  constructor(
    public value: any | null,
    public text?: string | null,
    public langKey?: string | null,
    public disabled?: boolean | null,
    public icon?: string | null,
  ) {}
}
