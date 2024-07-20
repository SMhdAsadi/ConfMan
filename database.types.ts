export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			Conference: {
				Row: {
					conference_id: number;
					description: string | null;
					end_date: number;
					image_url: string | null;
					location: string | null;
					name: string;
					start_date: number;
				};
				Insert: {
					conference_id?: never;
					description?: string | null;
					end_date: number;
					image_url?: string | null;
					location?: string | null;
					name: string;
					start_date: number;
				};
				Update: {
					conference_id?: never;
					description?: string | null;
					end_date?: number;
					image_url?: string | null;
					location?: string | null;
					name?: string;
					start_date?: number;
				};
				Relationships: [];
			};
			ConferenceAttendance: {
				Row: {
					conference_attendance_id: number;
					conference_id: number;
					participant_id: number;
					registration_date: number;
				};
				Insert: {
					conference_attendance_id?: never;
					conference_id: number;
					participant_id: number;
					registration_date: number;
				};
				Update: {
					conference_attendance_id?: never;
					conference_id?: number;
					participant_id?: number;
					registration_date?: number;
				};
				Relationships: [
					{
						foreignKeyName: "ConferenceAttendance_conference_id_fkey";
						columns: ["conference_id"];
						isOneToOne: false;
						referencedRelation: "Conference";
						referencedColumns: ["conference_id"];
					},
					{
						foreignKeyName: "ConferenceAttendance_conference_id_fkey1";
						columns: ["conference_id"];
						isOneToOne: false;
						referencedRelation: "Conference";
						referencedColumns: ["conference_id"];
					},
					{
						foreignKeyName: "ConferenceAttendance_participant_id_fkey";
						columns: ["participant_id"];
						isOneToOne: false;
						referencedRelation: "Participant";
						referencedColumns: ["participant_id"];
					},
					{
						foreignKeyName: "ConferenceAttendance_participant_id_fkey1";
						columns: ["participant_id"];
						isOneToOne: false;
						referencedRelation: "Participant";
						referencedColumns: ["participant_id"];
					},
				];
			};
			ConferenceProgram: {
				Row: {
					conference_id: number;
					description: string | null;
					end_date: number;
					location: string | null;
					name: string;
					program_id: number;
					start_date: number;
				};
				Insert: {
					conference_id: number;
					description?: string | null;
					end_date: number;
					location?: string | null;
					name: string;
					program_id?: never;
					start_date: number;
				};
				Update: {
					conference_id?: number;
					description?: string | null;
					end_date?: number;
					location?: string | null;
					name?: string;
					program_id?: never;
					start_date?: number;
				};
				Relationships: [
					{
						foreignKeyName: "ConferenceProgram_conference_id_fkey";
						columns: ["conference_id"];
						isOneToOne: false;
						referencedRelation: "Conference";
						referencedColumns: ["conference_id"];
					},
					{
						foreignKeyName: "ConferenceProgram_conference_id_fkey1";
						columns: ["conference_id"];
						isOneToOne: false;
						referencedRelation: "Conference";
						referencedColumns: ["conference_id"];
					},
				];
			};
			Participant: {
				Row: {
					email: string;
					first_name: string;
					last_name: string;
					organization: string | null;
					participant_id: number;
					phone_number: string | null;
				};
				Insert: {
					email: string;
					first_name: string;
					last_name: string;
					organization?: string | null;
					participant_id?: never;
					phone_number?: string | null;
				};
				Update: {
					email?: string;
					first_name?: string;
					last_name?: string;
					organization?: string | null;
					participant_id?: never;
					phone_number?: string | null;
				};
				Relationships: [];
			};
			ParticipantCheckIn: {
				Row: {
					check_in_id: number;
					check_in_time: number;
					conference_attendance_id: number;
				};
				Insert: {
					check_in_id?: never;
					check_in_time: number;
					conference_attendance_id: number;
				};
				Update: {
					check_in_id?: never;
					check_in_time?: number;
					conference_attendance_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: "ParticipantCheckIn_conference_attendance_id_fkey";
						columns: ["conference_attendance_id"];
						isOneToOne: false;
						referencedRelation: "ConferenceAttendance";
						referencedColumns: ["conference_attendance_id"];
					},
					{
						foreignKeyName: "ParticipantCheckIn_conference_attendance_id_fkey1";
						columns: ["conference_attendance_id"];
						isOneToOne: false;
						referencedRelation: "ConferenceAttendance";
						referencedColumns: ["conference_attendance_id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;
